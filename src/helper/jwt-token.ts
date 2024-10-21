import { sign } from "hono/jwt";

const JWT_TOKEN = process.env.JWT!;

export const generateJWTToken = async (id: number) => {
  const jwtToken = await sign({ id: id }, JWT_TOKEN);
  const CookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  };

  return { jwtToken, CookieOptions };
};
