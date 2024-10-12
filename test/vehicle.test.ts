import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { db } from "../src/app/database";
import { usersTable, vehicleTable } from "../src/schema";
import app from "../src/app/app";
import { httpStatus } from "../src/helper/http-status";
import { setCookie, setSignedCookie } from "hono/cookie";
import { generateJWTToken } from "../src/helper/jwt-token";

afterAll(async () => {
  await db.delete(vehicleTable);
  await db.delete(usersTable);
});

describe("POST /register/vehicle", () => {
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

  it("should be success register new vehicle", async () => {
    const req = new Request("http://localhost:3000/admin/register/vehicle", {
      method: "POST",
      body: JSON.stringify({
        vehicle_name: "vehicle_name",
        type: "vehicle_type",
        bbm_consumption: 20,
      }),
    });
    const res = await app.request(req);

    console.log(await res.text());

    expect(res.headers.get("set-cookie")).toBeDefined();
    expect(res.status).toBe(httpStatus.CREATED);
    expect(await res.json()).toEqual({
      status_code: httpStatus.CREATED,
      message: "Vehicle registered successfully",
    });
  });
});
