import { z } from "zod";

export interface TypeComment {
  comment: string;
}

export const TypeCommentSchema = z
  .object({
    comment: z.string(),
  })
  .strict();

export interface TypeInsertComment {
  userId: number;
  postId: number;
  comment: string;
}

export const FormatInsertComment = (
  userId: number,
  postId: number,
  comment: string,
): TypeInsertComment => {
  const newComment: TypeInsertComment = {
    userId: userId,
    postId: postId,
    comment: comment,
  };

  return newComment;
};
