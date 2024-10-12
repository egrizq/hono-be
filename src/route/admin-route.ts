import { Hono } from "hono";
import { AdminController } from "../controller/admin-controller";
import { checkTokenMiddleware } from "../middleware/check-token-middleware";

export const admin = new Hono();

//* auth
admin.post("/create/:role", (c) => AdminController.createAccount(c));
admin.post("/login", (c) => AdminController.login(c));
admin.delete("/logout/:role", (c) => AdminController.logout(c));

//* middleware
admin.use("/register/*", async (c, next) => {
  return await checkTokenMiddleware(c, next, "admin-token");
});

//* vehicle
admin.post("/register/vehicle", (c) => AdminController.createVehicle(c));

//* document
admin.post("/register/document", (c) => AdminController.createDocument(c));
