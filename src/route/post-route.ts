import { Hono } from "hono";
import { PostController } from "../controller/post-controller";
import { middlewareToken } from "../middleware/token-middleware";

export const posts = new Hono();

// middleware
posts.use(async (c, next) => {
  return await middlewareToken(c, next);
});

// posts route
posts.post("/", (c) => PostController.Create(c));
posts.put("/:id", (c) => PostController.Update(c));
posts.delete("/:id", (c) => PostController.Delete(c));
