import { db } from "../app/database";
import { commentTable, postTable } from "../schema";
import type { TypePost } from "../model/post-model";
import { eq, sql } from "drizzle-orm";

export class PostRepository {
  static async insertNewPost(data: TypePost, id: number) {
    const isSuccess = await db
      .insert(postTable)
      .values({
        title: data.title,
        content: data.content,
        user_id: id,
      })
      .returning({ id: postTable.id });

    return isSuccess[0];
  }

  static async checkPostId(id: number) {
    const isIdAvailable = await db
      .select({ id: postTable.id })
      .from(postTable)
      .where(eq(postTable.id, id));

    return isIdAvailable[0];
  }

  static async updatePost(data: TypePost, id: number) {
    const updateData = await db
      .update(postTable)
      .set(data)
      .where(eq(postTable.id, id))
      .returning({
        id: postTable.id,
        title: postTable.title,
        content: postTable.content,
      });

    return updateData[0];
  }

  static async deletePost(id: number) {
    const isDeleteSuccess = await db
      .delete(postTable)
      .where(eq(postTable.id, id))
      .returning({ id: postTable.id });

    return isDeleteSuccess[0];
  }

  static async getPostId(id: number) {
    interface TypePostWithComment {
      commentId: number;
      comment: string;
    }

    interface TypePostWithComments {
      postId: number;
      title: string;
      content: string;
      comments: TypePostWithComment[];
    }

    interface TypePostFromDB {
      postId: number | null;
      title: string | null;
      content: string | null;
      commentId: number | null;
      comment: string | null;
    }
    [];

    const postWithComments: TypePostFromDB[] = await db
      .select({
        postId: postTable.id,
        title: postTable.title,
        content: postTable.content,
        commentId: commentTable.id,
        comment: commentTable.comment,
      })
      .from(postTable)
      .fullJoin(commentTable, eq(postTable.id, commentTable.post_id))
      .where(eq(postTable.id, id));

    const post: TypePostWithComments = postWithComments.reduce((acc, row) => {
      // Initialize the accumulator if it's empty
      if (!acc.postId) {
        acc = {
          postId: row.postId!,
          title: row.title!,
          content: row.content!,
          comments: [],
        };
      }

      if (row.comment && row.commentId) {
        acc.comments.push({
          commentId: row.commentId,
          comment: row.comment,
        });
      }

      return acc;
    }, {} as TypePostWithComments);

    return post;
  }
}
