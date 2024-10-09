import { afterAll, describe, expect, it } from "bun:test";
import app from "../src/app/app";
import { db } from "../src/app/database";
import { usersTable } from "../src/schema";
import { httpStatus } from "../src/helper/http-status";
import { errorMessage } from "../src/error/error-message";
import { eq, or } from "drizzle-orm";

afterAll(async () => {
  await db.delete(usersTable);
});

describe("POST /admin/create", () => {
  it("should success create new admin account", async () => {
    const req = new Request("http://localhost:3000/admin/create", {
      method: "POST",
      body: JSON.stringify({
        name: "rizq ramadhan",
        username: "adminMaster1",
        password: "adminMaster1",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.CREATED);
    expect(await res.json()).toEqual({
      status_code: httpStatus.CREATED,
      message: "User registered successfully",
    });
  });

  it("should failed to create account, username already taken", async () => {
    const req = new Request("http://localhost:3000/admin/create", {
      method: "POST",
      body: JSON.stringify({
        name: "rizq ramadhan",
        username: "adminMaster1",
        password: "adminMaster1",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.BAD_REQUEST);
    expect(await res.json()).toEqual({
      status_code: httpStatus.BAD_REQUEST,
      message: errorMessage.USERNAME_TAKEN,
    });
  });

  it("should failed to create account, request invalid", async () => {
    const req = new Request("http://localhost:3000/admin/create", {
      method: "POST",
      body: JSON.stringify({
        name: "",
        username: "",
        password: "",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.BAD_REQUEST);
    expect(await res.json()).toEqual({
      status_code: httpStatus.BAD_REQUEST,
      message: errorMessage.INVALID_DATA,
    });
  });
});

describe("POST /admin/create/:role", () => {
  it("should success create new manager account", async () => {
    const req = new Request("http://localhost:3000/admin/create/manager", {
      method: "POST",
      body: JSON.stringify({
        name: "rizq ramadhan",
        username: "egrizq",
        password: "happymaster",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.CREATED);
    expect(await res.json()).toEqual({
      status_code: httpStatus.CREATED,
      message: "User registered successfully",
    });
  });

  it("should success create new driver account", async () => {
    const req = new Request("http://localhost:3000/admin/create/driver", {
      method: "POST",
      body: JSON.stringify({
        name: "rizq ramadhan",
        username: "rizqdriver",
        password: "happydriver",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.CREATED);
    expect(await res.json()).toEqual({
      status_code: httpStatus.CREATED,
      message: "User registered successfully",
    });
  });

  it("should return manager and driver account", async () => {
    const data = await db
      .select({
        username: usersTable.username,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(or(eq(usersTable.role, "manager"), eq(usersTable.role, "driver")));

    expect(data).toEqual([
      {
        username: "egrizq",
        role: "manager",
      },
      {
        username: "rizqdriver",
        role: "driver",
      },
    ]);

    expect(data[0]).toEqual({ username: "egrizq", role: "manager" });
    expect(data[1]).toEqual({ username: "rizqdriver", role: "driver" });
    expect(data.length).toEqual(2);
  });
});

describe("POST /admin/login", () => {
  it("should success to login", async () => {
    const req = new Request("http://localhost:3000/admin/login", {
      method: "POST",
      body: JSON.stringify({
        username: "adminMaster1",
        password: "adminMaster1",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.OK);
    expect(await res.json()).toEqual({
      status_code: httpStatus.OK,
      message: "Login successfull",
    });
  });

  it("should failed to login, request invalid", async () => {
    const req = new Request("http://localhost:3000/admin/login", {
      method: "POST",
      body: JSON.stringify({
        username: "wrong-username",
        password: "wrong-password",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    expect(await res.json()).toEqual({
      status_code: httpStatus.UNAUTHORIZED,
      message: errorMessage.USERNAME_PASSWORD_INCORRECT,
    });
  });

  it("should failed to login, wrong username", async () => {
    const req = new Request("http://localhost:3000/admin/login", {
      method: "POST",
      body: JSON.stringify({
        username: "adminMaster1",
        password: "adminMaster",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    expect(await res.json()).toEqual({
      status_code: httpStatus.UNAUTHORIZED,
      message: errorMessage.USERNAME_PASSWORD_INCORRECT,
    });
  });

  it("should failed to login, wrong password", async () => {
    const req = new Request("http://localhost:3000/admin/login", {
      method: "POST",
      body: JSON.stringify({
        username: "adminMaster",
        password: "adminMaster1",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    expect(await res.json()).toEqual({
      status_code: httpStatus.UNAUTHORIZED,
      message: errorMessage.USERNAME_PASSWORD_INCORRECT,
    });
  });
});
