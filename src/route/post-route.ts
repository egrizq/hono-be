import { Hono } from "hono";
import { Post } from "../controller/post-controller";
import { middlewareToken } from "../middleware/token-middleware";

export const posts = new Hono();

posts.use(async (c, next) => {
  return await middlewareToken(c, next);
});

posts.post("/", (c) => Post.Create(c));
