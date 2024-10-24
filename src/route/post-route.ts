import { Hono } from "hono";
import { Post } from "../controller/post-controller";
import { middlewareToken } from "../middleware/token-middleware";

export const posts = new Hono();

// middleware
posts.use(async (c, next) => {
  return await middlewareToken(c, next);
});

// posts route
posts.post("/", (c) => Post.Create(c));
posts.put("/:id", (c) => Post.Update(c));
posts.delete("/:id", (c) => Post.Delete(c));
