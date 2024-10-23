import {
  TypePostSchema,
  TypeUpdatePostSchema,
  type TypePost,
  type TypeReturnedUpdatedData,
} from "../model/post-model";
import { responseError } from "../error/error-response";
import { httpStatus } from "../helper/http-status";
import { errorMessage } from "../error/error-message";
import { PostRepository } from "../repository/post-repository";

export class PostService {
  static async Create(data: TypePost, id: number): Promise<string> {
    // parse response JSON
    const parseResult = TypePostSchema.safeParse(data);
    if (!parseResult.success) {
      throw new responseError(
        httpStatus.BAD_REQUEST,
        errorMessage.INVALID_DATA,
      );
    }

    // insert new post
    const isSuccess = await PostRepository.insertNewPost(data, id);
    if (!isSuccess) {
      throw new responseError(
        httpStatus.INTERNAL_SERVER_ERROR,
        errorMessage.INTERNAL_SERVER_ERROR,
      );
    }

    return "Post successfully created!";
  }

  static async Update(
    data: TypePost,
    id: number,
  ): Promise<TypeReturnedUpdatedData> {
    // parse response JSON
    const parseResult = TypeUpdatePostSchema.safeParse(data);
    if (!parseResult.success) {
      throw new responseError(
        httpStatus.BAD_REQUEST,
        errorMessage.INVALID_DATA,
      );
    }

    // check is id available
    const isIdAvailable = await PostRepository.checkId(id);
    if (!isIdAvailable) {
      throw new responseError(httpStatus.BAD_REQUEST, errorMessage.EMPTY_ID);
    }

    // update post
    const isUpdateSuccess = await PostRepository.updatePost(data, id);
    if (!isUpdateSuccess) {
      throw new responseError(
        httpStatus.INTERNAL_SERVER_ERROR,
        errorMessage.INTERNAL_SERVER_ERROR,
      );
    }

    // return new updated data
    const response: TypeReturnedUpdatedData = {
      message: "successfully updated post!",
      data: isUpdateSuccess!,
    };

    return response;
  }
}
