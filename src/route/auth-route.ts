import { Hono } from "hono";
import { AuthController } from "../controller/auth-controller";

export const auth = new Hono();

//* auth
auth.post("/register", (c) => AuthController.register(c));
auth.post("/login", (c) => AuthController.login(c));
auth.post("/logout", (c) => AuthController.logout(c));
