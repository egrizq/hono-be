import { TypePostSchema, type TypePost } from "../model/post-model";
import { responseError } from "../error/error-response";
import { httpStatus } from "../helper/http-status";
import { errorMessage } from "../error/error-message";
import { db } from "../app/database";
import { postTable } from "../schema";

export class PostService {
  static async Create(data: TypePost, id: number) {
    const parseResult = TypePostSchema.safeParse(data);
    if (!parseResult.success) {
      throw new responseError(
        httpStatus.BAD_REQUEST,
        errorMessage.INVALID_DATA,
      );
    }
    const isSuccess = await db
      .insert(postTable)
      .values({
        title: data.title,
        content: data.content,
        user_id: id,
      })
      .returning({ id: postTable.id });

    if (!isSuccess[0]) {
      throw new responseError(
        httpStatus.INTERNAL_SERVER_ERROR,
        errorMessage.INTERNAL_SERVER_ERROR,
      );
    }

    return "Post successfully created!";
  }
}
