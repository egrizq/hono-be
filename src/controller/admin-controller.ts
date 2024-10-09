import type { Context } from "hono";
import { type userLoginModel, type userCreateModel } from "../model/user-model";
import { AdminService } from "../service/admin-service";
import { httpStatus } from "../helper/http-status";
import { catchError } from "../error/error-response";

export class UserController {
  static async createAccount(context: Context) {
    try {
      const requestJSON: userCreateModel = await context.req.json();
      const response = await AdminService.register(context, requestJSON);

      return context.json(
        {
          status_code: httpStatus.CREATED,
          message: response,
        },
        httpStatus.CREATED
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }

  static async login(context: Context) {
    try {
      const requestJSON: userLoginModel = await context.req.json();
      const response = await AdminService.login(context, requestJSON);

      return context.json(
        {
          status_code: httpStatus.OK,
          message: response,
        },
        httpStatus.OK
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }

  static async logout(context: Context) {
    try {
      const response = await AdminService.logout(context);

      return context.json(
        {
          status_code: httpStatus.OK,
          message: response,
        },
        httpStatus.OK
      );
    } catch (error) {
      return await catchError(context, error);
    }
  }
}
