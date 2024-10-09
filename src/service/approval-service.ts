import { errorMessage } from "../error/error-message";
import { responseError } from "../error/error-response";
import { httpStatus } from "../helper/http-status";
import {
  approvalSchema,
  type approvalCreateModel,
} from "../model/approval-model";

export class ApprovalService {
  static async create(data: approvalCreateModel) {
    //* parse json
    const parseResult = approvalSchema.safeParse(data);
    if (!parseResult.success) {
      throw new responseError(
        httpStatus.BAD_REQUEST,
        errorMessage.INVALID_DATA
      );
    }

    //* is admin who created?
  }
}
