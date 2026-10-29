import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial('id').primaryKey(),
  email: p.text('email').notNull(),
  password: p.text('password').notNull(),
})
