import { errorMessage } from "../error/error-message";
import { responseError } from "../error/error-response";
import { httpStatus } from "../helper/http-status";
import {
  FormatInsertComment,
  TypeCommentSchema,
  type TypeComment,
} from "../model/comment-model";
import { CommentRepository } from "../repository/comment-repository";
import { PostRepository } from "../repository/post-repository";

export class CommentService {
  static async Create(data: TypeComment, postId: number, userId: number) {
    // parse json
    const parseJSON = TypeCommentSchema.safeParse(data);
    if (!parseJSON.success) {
      throw new responseError(
        httpStatus.BAD_REQUEST,
        errorMessage.INVALID_DATA,
      );
    }

    // check postId
    const isPostIdAvailable = await PostRepository.checkId(postId);
    if (!isPostIdAvailable) {
      throw new responseError(httpStatus.BAD_REQUEST, errorMessage.INVALID_ID);
    }

    // is comment success
    const dataComment = FormatInsertComment(userId, postId, data.comment);
    const isSuccessInsertNewComment =
      await CommentRepository.create(dataComment);

    if (!isSuccessInsertNewComment) {
      throw new responseError(
        httpStatus.INTERNAL_SERVER_ERROR,
        errorMessage.INTERNAL_SERVER_ERROR,
      );
    }

    // return
    return "Successfully inserted new comment to post!";
  }
}
