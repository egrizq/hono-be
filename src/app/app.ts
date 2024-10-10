import { Hono, type Context } from "hono";
import { logger } from "hono/logger";
import { notFound } from "../helper/notFound";
import { admin } from "../route/admin-route";
import { approval } from "../route/approval-route";
import { cors } from "hono/cors";

const app = new Hono();
app.use(logger());
app.use(
  "/*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["token", "Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "DELETE", "UPDATE"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/admin", admin);
app.route("/approvals", approval);

app.notFound((c) => notFound(c));

export default app;
