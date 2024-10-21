import { db } from "../app/database";
import { responseError } from "../error/error-response";
import { httpStatus } from "../helper/http-status";
import type { TypeListUsers } from "../model/users-model";
import { usersTable } from "../schema";

export class UsersService {
  static async List(): Promise<TypeListUsers[]> {
    const usersList = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        username: usersTable.username,
      })
      .from(usersTable);

    if (!usersList) {
      throw new responseError(httpStatus.NOT_FOUND, "Empty list of users data");
    }

    return usersList;
  }
}
