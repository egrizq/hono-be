import { Hono } from "hono";
import { logger } from "hono/logger";
import { notFound } from "../helper/notFound";
import { admin } from "../route/admin-route";
import { approval } from "../route/approval-route";
import { db } from "./database";
import { usersTable, vehicleTable } from "../schema";
import { deleteCookie } from "hono/cookie";

const app = new Hono();
app.use(logger());

app.route("/admin", admin);
app.route("/approvals", approval);

app.delete("/clear", async (c) => {
  await db.delete(usersTable);
  await db.delete(vehicleTable);

  const usersToken = ["admin", "manager", "driver"];
  usersToken.map((user) => deleteCookie(c, `${user}-token`));

  return c.json({ message: "delete all cookies and data" });
});

app.notFound((c) => notFound(c));

export default app;
