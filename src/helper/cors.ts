export const cors = {
  origin: "http://localhost:3000",
  allowHeaders: ["token", "Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "DELETE", "UPDATE"],
  maxAge: 600,
  credentials: true,
};
