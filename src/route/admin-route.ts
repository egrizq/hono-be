import { Hono } from "hono";
import { UserController } from "../controller/admin-controller";

export const admin = new Hono();

admin.post("/create", (c) => UserController.createAccount(c));
admin.post("/login", (c) => UserController.login(c));
admin.delete("/logout", (c) => UserController.logout(c));

admin.post("/create/:role", (c) => UserController.createAccount(c));
