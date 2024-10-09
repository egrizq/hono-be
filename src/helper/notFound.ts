import type { Context } from "hono";

export const notFound = (c: Context) => {
  c.status(404);
  const res = {
    message: "API is not found!",
  };
  return c.json(res);
};
