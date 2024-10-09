import { eq } from "drizzle-orm";
import { db } from "../app/database";
import { usersTable } from "../schema";
import type { userInsertModel } from "../model/user-model";

export class AdminRepository {
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

  static async checkPassword(username: string): Promise<string> {
    const hashedPassword = await db
      .select({ password: usersTable.password })
      .from(usersTable)
      .where(eq(usersTable.username, username));

    return hashedPassword[0].password!;
  }
}
