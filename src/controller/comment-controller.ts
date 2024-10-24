import type { Context } from "hono";
import { httpStatus } from "../helper/http-status";
import { catchError, responseError } from "../error/error-response";
import { CommentService } from "../service/comment-service";
import type { TypeComment } from "../model/comment-model";
import { checkId } from "../helper/check-id";
import { getSignedCookie } from "hono/cookie";
import { errorMessage } from "../error/error-message";
import { verify } from "hono/jwt";

export class CommentController {
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

    CommentController.userId = Number(id);
  }

  static async Create(context: Context) {
    try {
      await this.verifyJWT(context);

      const { id } = context.req.param();
      const postId = checkId(id);

      console.log("postid", id, "userId", this.userId);

      const requestJSON: TypeComment = await context.req.json();
      const response = await CommentService.Create(
        requestJSON,
        postId,
        this.userId!,
      );

      return context.json(
        { status_code: httpStatus.OK, message: response },
        httpStatus.OK,
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }
}
