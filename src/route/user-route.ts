import { Hono } from "hono";
import { middlewareToken } from "../middleware/token-middleware";
import { UserController } from "../controller/user-controller";

export const users = new Hono();

users.use(async (c, next) => {
  return await middlewareToken(c, next);
});

users.get("/", (c) => UserController.list(c));
