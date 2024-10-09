import type { Context } from "hono";
import { httpStatus } from "../helper/http-status";

export class responseError extends Error {
  constructor(public status_code: number, public message: string) {
    super(message);
  }
}

export async function catchError(c: Context, error: any) {
  if (error instanceof responseError) {
    return c.json(
      {
        status_code: error.status_code,
        message: error.message,
      },
      { status: error.status_code }
    );
  } else {
    return c.json(
      {
        status_code: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
