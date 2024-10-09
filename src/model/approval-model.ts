import { z } from "zod";

export interface approvalCreateModel {
  vehicle: string;
  driver: string;
  destination: string;
  date: string;
  approvel: string;
}

export const approvalSchema = z.object({
  vehicle: z.string(),
  driver: z.string(),
  destination: z.string(),
  date: z.string(),
  approvel: z.string(),
});
