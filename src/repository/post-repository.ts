import { db } from "../app/database";
import { postTable } from "../schema";
import type { TypePost } from "../model/post-model";
import { eq } from "drizzle-orm";

export class PostRepository {
  static async insertNewPost(data: TypePost, id: number) {
    const isSuccess = await db
      .insert(postTable)
      .values({
        title: data.title,
        content: data.content,
        user_id: id,
      })
      .returning({ id: postTable.id });

    return isSuccess[0];
  }

  static async checkId(id: number) {
    const isIdAvailable = await db
      .select({ id: postTable.id })
      .from(postTable)
      .where(eq(postTable.id, id));

    return isIdAvailable[0];
  }

  static async updatePost(data: TypePost, id: number) {
    const updateData = await db
      .update(postTable)
      .set(data)
      .where(eq(postTable.id, id))
      .returning({
        id: postTable.id,
        title: postTable.title,
        content: postTable.content,
      });

    return updateData[0];
  }
}
