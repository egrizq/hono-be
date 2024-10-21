import type { Context } from "hono";
import { UsersService } from "../service/user-service";
import { httpStatus } from "../helper/http-status";
import { catchError } from "../error/error-response";

export class Users {
  static async list(context: Context) {
    try {
      const responseData = await UsersService.List();

      return context.json(
        { status_code: httpStatus.OK, data: responseData },
        httpStatus.OK,
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }
}
