import { Hono } from "hono";
import { UserController } from "../controller/auth-controller";

export const auth = new Hono();

//* auth
auth.post("/register", (c) => UserController.register(c));
auth.post("/login", (c) => UserController.login(c));
auth.post("/logout", (c) => UserController.logout(c));
