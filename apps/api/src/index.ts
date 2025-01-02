import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { type AnyD1Database, drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { hc } from "hono/client";
import { cors } from "hono/cors";
import { sign } from "hono/jwt";
import { bloodline, cattle, motherInfo, todos, users } from "../db/schema";

type Bindings = {
  DB: AnyD1Database;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

const routes = app
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000", "https://logyuu.pages.dev"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type"],
    }),
  )

  .get("/healthcheck", async (c) => {
    return c.text("OK!");
  })

  // ------------------------------
  //  ユーザー関連 (user)
  // ------------------------------

  .post("/register", async (c) => {
    const { email, password } = await c.req.json();
    const passwordHash = await bcrypt.hash(password, 10);

    const db = drizzle(c.env.DB);
    const result = await db.insert(users).values({ email, passwordHash });
    if (!result.success) {
      return c.json(
        { success: false, message: "Unable to register user." },
        400,
      );
    }
    return c.json({ success: true }, 200);
  })

  .post("/login", async (c) => {
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
  })

  // ------------------------------
  //  個体 (Cattle) 関連
  // ------------------------------

  .get("/cattle", async (c) => {
    const db = drizzle(c.env.DB);
    try {
      const result = await db
        .select()
        .from(cattle)
        .leftJoin(motherInfo, eq(cattle.cattleId, motherInfo.cattleId))
        .leftJoin(bloodline, eq(cattle.cattleId, bloodline.cattleId));
      return c.json(result);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Failed to get cattle list." }, 500);
    }
  })

  // -----初期テスト用のTodo API-----
  .get("/", async (c) => {
    const db = drizzle(c.env.DB);
    const allTodos = await db.select().from(todos);
    return c.json(allTodos);
  })

  .post("/add", async (c) => {
    const { title } = await c.req.json();
    const db = drizzle(c.env.DB);
    await db.insert(todos).values({ title });
    return c.json({ success: true });
  })

  .delete("/delete/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const db = drizzle(c.env.DB);
    await db.delete(todos).where(eq(todos.id, id));
    return c.json({ success: true });
  });
// -----初期テスト用のTodo API-----

export type AppType = typeof routes;

type ClientType = typeof hc<AppType>;

export const createClient = (
  ...args: Parameters<ClientType>
): ReturnType<ClientType> => {
  return hc<AppType>(...args);
};

export default app;
