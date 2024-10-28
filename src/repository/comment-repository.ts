import { eq } from "drizzle-orm";
import { db } from "../app/database";
import type { TypeInsertComment } from "../model/comment-model";
import { commentTable } from "../schema";

export class CommentRepository {
  static async create(dataComment: TypeInsertComment) {
    const isCommentSuccess = await db
      .insert(commentTable)
      .values({
        user_id: dataComment.userId,
        post_id: dataComment.postId,
        comment: dataComment.comment,
      })
      .returning({ id: commentTable.id });

    return isCommentSuccess[0];
  }

  static async isCommentAvailable(commentId: number) {
    const isAvailable = await db
      .select()
      .from(commentTable)
      .where(eq(commentTable.id, commentId));

    return isAvailable[0];
  }

  static async delete(commentId: number) {
    const isDeleteSuccess = await db
      .delete(commentTable)
      .where(eq(commentTable.id, commentId))
      .returning({ id: commentTable.id });

    return isDeleteSuccess[0];
  }
}
