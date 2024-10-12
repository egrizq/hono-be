import { eq } from "drizzle-orm";
import { db } from "../app/database";
import { usersTable } from "../schema";
import type { getUserPassAndRole, userInsertModel } from "../model/user-model";

export class AdminRepository {
  static async findUserByUsername(
    username: string
  ): Promise<getUserPassAndRole> {
    const result = await db
      .select({
        hashedPassword: usersTable.password,
        role: usersTable.role,
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

  static async insertNewUser(data: userInsertModel): Promise<boolean> {
    const insertedUser = await db
      .insert(usersTable)
      .values(data)
      .returning({ id: usersTable.id });

    return insertedUser.length !== 0;
  }
}
