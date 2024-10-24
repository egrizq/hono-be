import type { Context } from "hono";
import { errorMessage } from "../error/error-message";
import { httpStatus } from "../helper/http-status";
import {
  formatNewData,
  userLoginSchema,
  userRegisterSchema,
  type userLoginModel,
  type userCreateModel,
} from "../model/users-model";
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import { responseError } from "../error/error-response";
import { generateJWTToken } from "../helper/jwt-token";
import { UserRepository } from "../repository/user-repository";

export class AdminService {
  static readonly JWT_TOKEN = process.env.JWT!;

  static async register(
    context: Context,
    data: userCreateModel,
  ): Promise<string> {
    //* parse json
    const parseResult = userRegisterSchema.safeParse(data);

    if (!parseResult.success) {
      throw new responseError(
        httpStatus.BAD_REQUEST,
        errorMessage.INVALID_DATA,
      );
    }
    const { username, password } = parseResult.data;

    //* check username exist
    const isUsernameExist = await UserRepository.checkUsernameExist(username);

    if (!isUsernameExist) {
      throw new responseError(
        httpStatus.BAD_REQUEST,
        errorMessage.USERNAME_TAKEN,
      );
    }

    //* hash password
    const hashedPassword = await Bun.password.hash(password);

    //* insert to db
    const newUserData = formatNewData(parseResult.data, hashedPassword);
    const newUserId = await UserRepository.insertNewUser(newUserData);

    if (!newUserId) {
      throw new responseError(
        httpStatus.INTERNAL_SERVER_ERROR,
        errorMessage.INTERNAL_SERVER_ERROR,
      );
    }

    //* set jwt-session
    const { jwtToken, CookieOptions } = await generateJWTToken(newUserId);
    await setSignedCookie(
      context,
      `token`,
      jwtToken,
      this.JWT_TOKEN,
      CookieOptions,
    );

    return "User registered successfully";
  }

  static async login(context: Context, data: userLoginModel): Promise<string> {
    //* parse json
    const parseResult = userLoginSchema.safeParse(data);

    if (!parseResult.success) {
      throw new responseError(
        httpStatus.BAD_REQUEST,
        errorMessage.INVALID_DATA,
      );
    }
    const { username, password } = parseResult.data;

    //* check username exist
    const { id, hashedPassword } =
      await UserRepository.findUserByUsername(username);
    if (!hashedPassword) {
      throw new responseError(
        httpStatus.UNAUTHORIZED,
        errorMessage.USERNAME_PASSWORD_INCORRECT,
      );
    }

    //* check password
    const isPasswordCorrect = await Bun.password.verify(
      password,
      hashedPassword!,
    );

    if (!isPasswordCorrect) {
      throw new responseError(
        httpStatus.UNAUTHORIZED,
        errorMessage.USERNAME_PASSWORD_INCORRECT,
      );
    }

    //* set jwt-session
    const { jwtToken, CookieOptions } = await generateJWTToken(id);
    await setSignedCookie(
      context,
      `token`,
      jwtToken,
      this.JWT_TOKEN,
      CookieOptions,
    );

    return "Login successfully";
  }

  static async logout(context: Context): Promise<string> {
    const authToken = await getSignedCookie(context, this.JWT_TOKEN, `token`);

    if (!authToken) {
      throw new responseError(
        httpStatus.UNAUTHORIZED,
        errorMessage.UNAUTHORIZED_ACCESS,
      );
    }
    deleteCookie(context, "token");

    return "Logout successfully";
  }
}
