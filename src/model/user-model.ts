import { z } from "zod";

export interface userCreateModel {
  name: string;
  username: string;
  password: string;
}

export const userRegisterSchema = z.object({
  name: z.string().min(5),
  username: z.string().min(5),
  password: z.string().min(5),
});

export interface userInsertModel {
  name: string;
  username: string;
  password: string;
  role?: string;
}

export const formatNewData = (
  data: userCreateModel,
  hashPass: string,
  role?: string
) => {
  return {
    name: data.name,
    username: data.username,
    password: hashPass,
    role: data.username.includes("admin") ? "admin" : role,
  };
};

export interface userLoginModel {
  username: string;
  password: string;
}

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
