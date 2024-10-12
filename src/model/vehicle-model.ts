import { z } from "zod";

export interface vehicleCreateModel {
  vehicle_name: string;
  type: string;
  bbm_consumption: number;
}

export const vehicleSchema = z.object({
  vehicle_name: z.string().min(5),
  type: z.string().min(5),
  bbm_consumption: z.number(),
});
