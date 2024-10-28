import type { Context } from "hono";
import { UsersService } from "../service/user-service";
import { httpStatus } from "../helper/http-status";
import { catchError } from "../error/error-response";
import { checkId } from "../helper/check-id";
import type { TypeUserModel } from "../model/users-model";
import { deleteCookie } from "hono/cookie";

export class UserController {
  static async List(context: Context) {
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

  static async Update(context: Context) {
    try {
      const { id } = context.req.param();
      const userId = checkId(id);

      const requestJSON: TypeUserModel = await context.req.json();
      const responseData = await UsersService.Update(requestJSON, userId);

      return context.json(
        { status_code: httpStatus.OK, data: responseData },
        httpStatus.OK,
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }

  static async Delete(context: Context) {
    try {
      const { id } = context.req.param();
      const userId = checkId(id);

      const response = await UsersService.Delete(userId);
      deleteCookie(context, "token");

      return context.json(
        { status_code: httpStatus.OK, message: response },
        httpStatus.OK,
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }
}
