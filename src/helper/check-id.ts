import { errorMessage } from "../error/error-message";
import { responseError } from "../error/error-response";
import { httpStatus } from "./http-status";

export const checkId = (id: string): number => {
  const convertId = Number(id);

  if (isNaN(convertId)) {
    throw new responseError(httpStatus.BAD_REQUEST, errorMessage.INVALID_ID);
  }

  return convertId;
};
