import type { Context } from "hono";
import type { approvalCreateModel } from "../model/approval-model";

export class Approval {
  static async create(context: Context) {
    try {
      // const requestJSON: approvalCreateModel = context.req.json();
    } catch (error) {}
  }
}
