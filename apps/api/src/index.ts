import { eq } from "drizzle-orm";
import { type AnyD1Database, drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { todos } from "./schema";

type Bindings = {
  DB: AnyD1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://logyuu.pages.dev"],
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

app.get("/", async (c) => {
  const db = drizzle(c.env.DB);
  const allTodos = await db.select().from(todos);
  return c.json(allTodos);
});

app.post("/add", async (c) => {
  const { title } = await c.req.json();
  const db = drizzle(c.env.DB);
  await db.insert(todos).values({ title });
  return c.json({ success: true });
});

app.delete("/delete/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const db = drizzle(c.env.DB);
  await db.delete(todos).where(eq(todos.id, id));
  return c.json({ success: true });
});

export default app;
