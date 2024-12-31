import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { type AnyD1Database, drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { sign } from "hono/jwt";
import { todos, users } from "../db/schema";

type Bindings = {
  DB: AnyD1Database;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://logyuu.pages.dev"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

app.get("/healthcheck", async (c) => {
  return c.text("OK!");
});

app.post("/register", async (c) => {
  const { email, password } = await c.req.json();
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const db = drizzle(c.env.DB);
    await db.insert(users).values({ email, passwordHash });
    return c.json({ success: true }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Unable to register user." }, 400);
  }
});

app.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  try {
    const db = drizzle(c.env.DB);
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user && (await bcrypt.compare(password, user[0].passwordHash))) {
      const token = await sign({ id: user[0].id }, "secret");
      return c.json({ jwt: token });
    }
    return c.json({ message: "Invalid email or password." }, 401);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Authentication failed." }, 500);
  }
});

// -----初期テスト用のTodo API-----
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
// -----初期テスト用のTodo API-----

export default app;
