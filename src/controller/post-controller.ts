import type { Context } from "hono";
import type { TypePost } from "../model/post-model";
import { getSignedCookie } from "hono/cookie";
import { PostService } from "../service/post-service";
import { httpStatus } from "../helper/http-status";
import { catchError, responseError } from "../error/error-response";
import { verify } from "hono/jwt";
import { errorMessage } from "../error/error-message";
import { checkId } from "../helper/check-id";

export class PostController {
  private static userId: number | null = null;

  private static async verifyJWT(context: Context) {
    const signedCookie = await getSignedCookie(
      context,
      process.env.JWT!,
      "token",
    );
    if (!signedCookie) {
      throw new responseError(
        httpStatus.UNAUTHORIZED,
        errorMessage.UNAUTHORIZED_ACCESS,
      );
    }
    const { id } = await verify(signedCookie!, process.env.JWT!);

    PostController.userId = Number(id);
  }

  static async Create(context: Context) {
    try {
      await this.verifyJWT(context);

      const requestJSON: TypePost = await context.req.json();
      const response = await PostService.Create(requestJSON, this.userId!);

      return context.json(
        { status_code: httpStatus.OK, data: response },
        httpStatus.OK,
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }

  static async Update(context: Context) {
    try {
      const { id } = context.req.param();
      const postId = checkId(id);

      const requestJSON: TypePost = await context.req.json();
      const response = await PostService.Update(requestJSON, postId);

      return context.json(
        { status_code: httpStatus.OK, data: response },
        httpStatus.OK,
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }

  static async Delete(context: Context) {
    try {
      const { id } = context.req.param();
      const postId = checkId(id);

      const response = await PostService.Delete(postId);
      return context.json(
        { status_code: httpStatus.OK, message: response },
        httpStatus.OK,
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }
}
