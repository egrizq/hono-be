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
}
