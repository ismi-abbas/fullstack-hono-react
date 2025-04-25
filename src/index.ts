import { Hono } from "hono";
import { db } from "./db";
import { usersTable, insertUserSchema } from "./db/schema";
import { zValidator } from "@hono/zod-validator";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";

const app = new Hono()
  .use("*", cors())
  .on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))
  .basePath("/api")
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .post("/test", async (c) => {
    const body = await c.req.json();
    return c.json(body);
  })
  .post("/user", zValidator("json", insertUserSchema), async (c) => {
    const body = c.req.valid("json");
    const userCreated = await db.insert(usersTable).values(body).returning();

    return c.json({
      message: "User created",
      user: userCreated,
    });
  })
  .get("/users", async (c) => {
    const users = await db.select().from(usersTable);
    return c.json(users);
  });

  app.use("*", serveStatic({ root: "./frontend/dist/" }));
  app.use("*", serveStatic({ path: "./frontend/dist/index.html" }));

export type AppType = typeof app;

export default {
  port: 8080,
  fetch: app.fetch,
};
