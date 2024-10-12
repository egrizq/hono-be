import { eq } from "drizzle-orm";
import { db } from "../app/database";
import { vehicleTable } from "../schema";
import type { vehicleCreateModel } from "../model/vehicle-model";

export class VehicleRepository {
  static async checkTypeExist(vehicleType: string) {
    const isTypeExist = await db
      .select()
      .from(vehicleTable)
      .where(eq(vehicleTable.type, vehicleType))
      .limit(1);

    return isTypeExist.length !== 0;
  }

  static async insertNewVehicle(data: vehicleCreateModel) {
    const getID = await db
      .insert(vehicleTable)
      .values({
        ...data,
        status: "ready",
      })
      .returning({ id: vehicleTable.id });

    return getID[0].id !== 0;
  }
}
