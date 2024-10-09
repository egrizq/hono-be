import { sign } from "hono/jwt";

const JWT_TOKEN = process.env.JWT!;

export const generateJWTToken = async (username: string) => {
  const jwtToken = await sign({ user: username }, JWT_TOKEN);
  const CookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  };

  return { jwtToken, CookieOptions };
};
