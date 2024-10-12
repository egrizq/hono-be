import type { Context, Next } from "hono";
import { getSignedCookie } from "hono/cookie";
import { httpStatus } from "../helper/http-status";
import { errorMessage } from "../error/error-message";

export async function checkTokenMiddleware(
  context: Context,
  next: Next,
  tokenName: string
) {
  const authToken = await getSignedCookie(context, process.env.JWT!, tokenName);
  if (!authToken) {
    return context.json(
      {
        error_code: httpStatus.UNAUTHORIZED,
        message: errorMessage.UNAUTHORIZED_ACCESS,
      },
      httpStatus.UNAUTHORIZED
    );
  }

  await next();
}
