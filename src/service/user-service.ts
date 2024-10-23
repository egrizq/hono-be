import { errorMessage } from "../error/error-message";
import { responseError } from "../error/error-response";
import { httpStatus } from "../helper/http-status";
import type { TypeListUsers } from "../model/users-model";
import { UserRepository } from "../repository/user-repository";

export class UsersService {
  static async List(): Promise<TypeListUsers[]> {
    const usersList = await UserRepository.getUsersList();
    if (!usersList) {
      throw new responseError(httpStatus.NOT_FOUND, errorMessage.EMPTY_DATA);
    }

    return usersList;
  }
}
