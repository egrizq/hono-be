import { Hono, type Context } from "hono";
import { logger } from "hono/logger";
import { notFound } from "../helper/notFound";
import { admin } from "../route/admin-route";
import { approval } from "../route/approval-route";

const app = new Hono();
app.use(logger());

app.route("/admin", admin);
app.route("/approvals", approval);

app.notFound((c) => notFound(c));

export default app;
