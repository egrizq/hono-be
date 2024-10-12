import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  date,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  username: text("username"),
  password: text("password"),
  role: text("role"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const vehicleTable = pgTable("vehicle", {
  id: serial("id").primaryKey(),
  vehicle_name: text("vehicle_name"),
  type: text("type"),
  bbm_consumption: integer("bbm_consumption"),
  status: text("status"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const driverTable = pgTable("driver", {
  id: serial("id").primaryKey(),
  users_id: integer("users_id").references(() => usersTable.id),
  status: text("status"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const documentTable = pgTable("document", {
  id: serial("id").primaryKey(),
  document: text("document"),
  id_vehicle: integer("id_vehicle").references(() => vehicleTable.id),
  id_driver: integer("id_driver").references(() => driverTable.id),
  destination: text("destination"),
  date: date("date"),
  id_manager: integer("id_manager").references(() => usersTable.id),
  status: text("status"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertVehicle = typeof vehicleTable.$inferInsert;
export type SelectVehicle = typeof vehicleTable.$inferSelect;

export type InsertDriver = typeof driverTable.$inferInsert;
export type SelectDriver = typeof driverTable.$inferSelect;

export type InsertBookings = typeof documentTable.$inferInsert;
export type SelectBookings = typeof documentTable.$inferSelect;
