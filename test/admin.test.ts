import { afterAll, describe, expect, it } from "bun:test";
import app from "../src/app/app";
import { db } from "../src/app/database";
import { usersTable } from "../src/schema";
import { httpStatus } from "../src/helper/http-status";
import { errorMessage } from "../src/error/error-message";

afterAll(async () => {
  await db.delete(usersTable);
});

describe("POST /admin/create/:role", () => {
  it("should success create new admin account", async () => {
    const req = new Request("http://localhost:3000/admin/create/admin", {
      method: "POST",
      body: JSON.stringify({
        name: "usernameAdmin",
        username: "usernameAdmin",
        password: "usernameAdmin",
      }),
    });
    const res = await app.request(req);

    expect(res.headers.get("set-cookie")).toBeDefined();
    expect(res.status).toBe(httpStatus.CREATED);
    expect(await res.json()).toEqual({
      status_code: httpStatus.CREATED,
      message: "User registered successfully",
    });
  });

  it("should success create new manager account", async () => {
    const req = new Request("http://localhost:3000/admin/create/manager", {
      method: "POST",
      body: JSON.stringify({
        name: "usernameManager",
        username: "usernameManager",
        password: "usernameManager",
      }),
    });
    const res = await app.request(req);

    expect(res.headers.get("set-cookie")).toBeDefined();
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
        name: "usernameDriver",
        username: "usernameDriver",
        password: "usernameDriver",
      }),
    });
    const res = await app.request(req);

    expect(res.headers.get("set-cookie")).toBeDefined();
    expect(res.status).toBe(httpStatus.CREATED);
    expect(await res.json()).toEqual({
      status_code: httpStatus.CREATED,
      message: "User registered successfully",
    });
  });

  it("should failed to create account, wrong role", async () => {
    const req = new Request("http://localhost:3000/admin/create/director", {
      method: "POST",
      body: JSON.stringify({
        name: "wrong_role",
        username: "wrong_role",
        password: "wrong_role",
      }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(httpStatus.BAD_REQUEST);
    expect(await res.json()).toEqual({
      status_code: httpStatus.BAD_REQUEST,
      message: errorMessage.INVALID_PARAMS,
    });
  });

  it("should return admin, manager and driver account", async () => {
    const data = await db
      .select({
        username: usersTable.username,
        role: usersTable.role,
      })
      .from(usersTable);

    expect(data).toEqual([
      {
        username: "usernameAdmin",
        role: "admin",
      },
      {
        username: "usernameManager",
        role: "manager",
      },
      {
        username: "usernameDriver",
        role: "driver",
      },
    ]);

    expect(data[0]).toEqual({ username: "usernameAdmin", role: "admin" });
    expect(data[1]).toEqual({ username: "usernameManager", role: "manager" });
    expect(data[2]).toEqual({ username: "usernameDriver", role: "driver" });
    expect(data.length).toEqual(3);
  });

  it("should failed to create account, username already taken", async () => {
    const req = new Request("http://localhost:3000/admin/create/admin", {
      method: "POST",
      body: JSON.stringify({
        name: "usernameAdmin",
        username: "usernameAdmin",
        password: "usernameAdmin",
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
    const req = new Request("http://localhost:3000/admin/create/admin", {
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

describe("POST /admin/login", () => {
  it("should success to login", async () => {
    const req = new Request("http://localhost:3000/admin/login", {
      method: "POST",
      body: JSON.stringify({
        username: "usernameAdmin",
        password: "usernameAdmin",
      }),
    });
    const res = await app.request(req);

    expect(res.headers.get("set-cookie")).toBeDefined();
    expect(res.status).toBe(httpStatus.OK);
    expect(await res.json()).toEqual({
      status_code: httpStatus.OK,
      message: "Login successfull",
    });
  });

  it("should failed to login, wrong username and password", async () => {
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
        username: "wrong_usernameAdmin",
        password: "usernameAdmin",
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
        username: "usernameAdmin",
        password: "wrong_usernameAdmin",
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

// describe("DELETE /admin/logout", () => {
//   it("should be success logout", async () => {
//     const logg = new Request("http://localhost:3000/admin/login", {
//       method: "POST",
//       body: JSON.stringify({
//         username: "usernameAdmin",
//         password: "usernameAdmin",
//       }),
//     });
//     const restwp = await app.request(logg);
//     expect(restwp.headers.get("set-cookie")).toBeDefined();

//     const req = new Request("http://localhost:3000/admin/logout", {
//       method: "DELETE",
//     });
//     const res = await app.request(req);

//     console.log(await res.text());
//     console.log(res.headers.get("set-cookie"));

//     expect(res.headers.get("set-cookie")).toBeNull();
//     expect(res.status).toBe(httpStatus.OK);
//     expect(await res.json()).toEqual({
//       status_code: httpStatus.OK,
//       message: "Logout successfully",
//     });
//   });
// });
