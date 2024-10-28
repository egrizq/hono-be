import { eq } from "drizzle-orm";
import { db } from "../app/database";
import { usersTable } from "../schema";
import type { TypeFindUsername, TypeUserModel } from "../model/users-model";

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

  static async isUsernameIdExist(userId: number): Promise<boolean> {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    return result.length === 0;
  }

  static async insertNewUser(data: TypeUserModel): Promise<number | null> {
    const insertedUser = await db
      .insert(usersTable)
      .values(data)
      .returning({ id: usersTable.id });

    return insertedUser[0].id;
  }

  static async updateUserData(updated: TypeUserModel, userId: number) {
    const isSuccess = await db
      .update(usersTable)
      .set({
        name: updated.name,
        username: updated.username,
        password: updated.password,
      })
      .where(eq(usersTable.id, userId))
      .returning({
        name: usersTable.name,
        username: usersTable.username,
        password: usersTable.password,
      });

    return isSuccess[0];
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

  static async deleteUser(userId: number) {
    const isSuccessDeleteUser = await db
      .delete(usersTable)
      .where(eq(usersTable.id, userId))
      .returning();

    return isSuccessDeleteUser[0];
  }
}
