import { Hono } from "hono";
import { logger } from "hono/logger";
import { notFound } from "../helper/notFound";
import { db } from "./database";
import { usersTable } from "../schema";
import { deleteCookie } from "hono/cookie";
import { auth } from "../route/auth-route";
import { users } from "../route/user-route";
import { posts } from "../route/post-route";
import { comments } from "../route/comment-route";

const app = new Hono();
app.use(logger());

app.route("/auth", auth);
app.route("/users", users);
app.route("/posts", posts);
app.route("/comments", comments);

app.delete("/clear", async (c) => {
  await db.delete(usersTable);
  deleteCookie(c, "token");
  return c.json({ message: "delete all cookies and data" });
});

app.notFound((c) => notFound(c));

export default app;
