import { eq } from "drizzle-orm";
import { db } from "../app/database";
import { usersTable } from "../schema";
import type { userInsertModel } from "../model/users-model";

interface TypeFindUsername {
  id: number;
  hashedPassword: string | null;
}

export class UserRepository {
  static async findUserByUsername(username: string): Promise<TypeFindUsername> {
    const result = await db
      .select({
        id: usersTable.id,
        hashedPassword: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    return result[0];
  }

  static async checkUsernameExist(username: string): Promise<boolean> {
    const result = await db
      .select({ username: usersTable.username })
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    return result.length === 0;
  }

  static async insertNewUser(data: userInsertModel): Promise<number | null> {
    const insertedUser = await db
      .insert(usersTable)
      .values(data)
      .returning({ id: usersTable.id });

    return insertedUser[0].id;
  }

  static async getUsersList() {
    const usersList = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        username: usersTable.username,
      })
      .from(usersTable);

    return usersList;
  }
}
