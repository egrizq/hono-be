import { errorMessage } from "../error/error-message";
import { responseError } from "../error/error-response";
import { httpStatus } from "../helper/http-status";
import type { TypeListUsers, TypeUserModel } from "../model/users-model";
import { UserRepository } from "../repository/user-repository";

export class UsersService {
  static async List(): Promise<TypeListUsers[]> {
    const usersList = await UserRepository.getUsersList();
    if (!usersList) {
      throw new responseError(httpStatus.NOT_FOUND, errorMessage.EMPTY_DATA);
    }

    return usersList;
  }

  static async Update(data: TypeUserModel, userId: number) {
    // check user userId
    const isUserIdExist = await UserRepository.isUsernameIdExist(userId);
    if (!isUserIdExist) {
      throw new responseError(httpStatus.BAD_REQUEST, errorMessage.INVALID_ID);
    }

    // check username exist
    // const isUsernameExist = await UserRepository.checkUsernameExist(data.username)
    // if (!isUsernameExist) {
    //   throw new
    // }

    // update data
    const isUpdateSuccess = await UserRepository.updateUserData(data, userId);
    if (!isUpdateSuccess) {
      throw new responseError(
        httpStatus.INTERNAL_SERVER_ERROR,
        errorMessage.INTERNAL_SERVER_ERROR,
      );
    }

    // return
    return "Successfully update data!";
  }

  static async Delete(userId: number) {
    const isDeleteUserSuccess = await UserRepository.deleteUser(userId);
    if (!isDeleteUserSuccess) {
      throw new responseError(httpStatus.BAD_REQUEST, errorMessage.INVALID_ID);
    }

    return "Successfully delete user!";
  }
}
