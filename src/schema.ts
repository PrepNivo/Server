import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.uuid('id').defaultRandom().primaryKey(),
  email: p.text('email').notNull(),
  password: p.text('password').notNull(),
  fullname: p.text('full_name').notNull(),
})
