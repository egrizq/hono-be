import { Hono } from "hono";
import { middlewareToken } from "../middleware/token-middleware";
import { CommentController } from "../controller/comment-controller";

export const comments = new Hono();

// middleware
comments.use(async (c, next) => {
  return await middlewareToken(c, next);
});

// posts route
comments.post("/:id", (c) => CommentController.Create(c));
