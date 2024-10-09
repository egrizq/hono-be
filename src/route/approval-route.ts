import { Hono, type Context, type Next } from "hono";
import { getSignedCookie } from "hono/cookie";

export const approval = new Hono();

approval.use(async (c, next) => {
  return await middleware(c, next);
});

async function middleware(context: Context, next: Next) {
  const authToken = await getSignedCookie(context, process.env.JWT!, "token");
  if (!authToken) {
    return context.json({ error: "cannot entries" });
  }

  await next();
}

approval.get("/request", (c) => {
  return c.json({ message: "rizq" });
});
