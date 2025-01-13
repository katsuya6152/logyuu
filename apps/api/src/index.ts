import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { type AnyD1Database, drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { hc } from "hono/client";
import { deleteCookie, setCookie } from "hono/cookie";
import { cors } from "hono/cors";
import { sign } from "hono/jwt";
import { bloodline, cattle, motherInfo, users } from "../db/schema";

type Bindings = {
  DB: AnyD1Database;
};

// TODO: envファイルから取得する
const secret = "ENV_JWT_SECRET_KEY";

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

const routes = app
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000", "https://logyuu.pages.dev"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type"],
      credentials: true,
    }),
  )

  // TODO: 認証を追加する
  // .use("/cattle", jwt({ cookie: "logyuu", secret: secret }))

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

  // .post("/login", async (c) => {
  //   const { email, password } = await c.req.json();

  //   try {
  //     const db = drizzle(c.env.DB);
  //     const user = await db
  //       .select()
  //       .from(users)
  //       .where(eq(users.email, email))
  //       .limit(1);
  //     if (user && (await bcrypt.compare(password, user[0].passwordHash))) {
  //       const token = await sign({ id: user[0].id }, "secret");
  //       return c.json({ jwt: token });
  //     }
  //     return c.json({ message: "Invalid email or password." }, 401);
  //   } catch (error) {
  //     console.error(error);
  //     return c.json({ message: "Authentication failed." }, 500);
  //   }
  // })

  .post("/login", async (c) => {
    try {
      const { email, password } = await c.req.json();
      const db = drizzle(c.env.DB);

      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user || user.length === 0) {
        return c.json({ message: "Invalid credentials." }, 401);
      }

      const match = await bcrypt.compare(password, user[0].passwordHash);
      if (!match) {
        return c.json({ message: "Invalid credentials." }, 401);
      }

      const payload = {
        sub: String(user[0].id),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };
      const token = await sign(payload, secret);

      setCookie(c, "logyuu", token, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "None",
        maxAge: 60 * 60,
      });

      return c.json({ success: true, jwt: token }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Login failed." }, 500);
    }
  })

  .get("/logout", (c) => {
    deleteCookie(c, "logyuu");
    return c.json({ success: true, message: "Logged out." }, 200);
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

  .post("/cattle", async (c) => {
    try {
      // const payload = c.get("jwtPayload");
      // const ownerUserId = payload.id as number;
      const body = await c.req.json();
      const db = drizzle(c.env.DB);

      if (
        !body.identificationNumber ||
        !body.name ||
        !body.growthStage ||
        !body.gender
      ) {
        return c.json(
          { success: false, message: "Missing required fields." },
          400,
        );
      }

      const insertResult = await db.insert(cattle).values({
        ownerUserId: 5,
        identificationNumber: body.identificationNumber,
        earTagNumber: body.earTagNumber ?? null,
        name: body.name,
        growthStage: body.growthStage,
        birthday: body.birthday ?? null,
        age: body.age ?? null,
        monthsOld: body.monthsOld ?? null,
        daysOld: body.daysOld ?? null,
        gender: body.gender,
        score: body.score ?? null,
        breed: body.breed ?? null,
        healthStatus: body.healthStatus ?? null,
        producerName: body.producerName ?? null,
        barn: body.barn ?? null,
        breedingValue: body.breedingValue ?? null,
        notes: body.notes ?? null,
      });

      if (!insertResult.success) {
        return c.json(
          { success: false, message: "Failed to insert cattle." },
          400,
        );
      }

      return c.json(
        { success: true, insertedId: insertResult.lastInsertRowid },
        201,
      );
    } catch (error) {
      console.error(error);
      return c.json(
        { success: false, message: "Failed to create cattle data." },
        500,
      );
    }
  })

  .delete("/cattle", async (c) => {
    try {
      const { cattleId } = await c.req.json();

      if (!cattleId) {
        return c.json(
          { success: false, message: "cattleId is required." },
          400,
        );
      }

      const db = drizzle(c.env.DB);

      // 例: 「この牛が本当にログインユーザーの所有物か？」などのチェックをしたい場合
      // const payload = c.get("jwtPayload");
      // const ownerUserId = payload?.sub; // など
      // それと合致するかどうかを確認して削除するのが望ましい

      await db
        .delete(cattle)
        .where(eq(cattle.cattleId, Number(cattleId)))
        .run();

      return c.json(
        { success: true, message: "Cattle data deleted successfully." },
        200,
      );
    } catch (error) {
      console.error(error);
      return c.json(
        { success: false, message: "Failed to delete cattle data." },
        500,
      );
    }
  })

  .get("/cattle/:cattleId", async (c) => {
    const db = drizzle(c.env.DB);
    const { cattleId } = c.req.param();

    if (!cattleId) {
      return c.json({ success: false, message: "cattleId is required." }, 400);
    }

    try {
      const result = await db
        .select()
        .from(cattle)
        .leftJoin(motherInfo, eq(cattle.cattleId, motherInfo.cattleId))
        .leftJoin(bloodline, eq(cattle.cattleId, bloodline.cattleId))
        .where(eq(cattle.cattleId, Number(cattleId)));

      if (result.length === 0) {
        return c.json({ success: false, message: "Cattle not found." }, 404);
      }

      return c.json({ success: true, data: result[0] }, 200);
    } catch (error) {
      console.error(error);
      return c.json(
        { success: false, message: "Failed to retrieve cattle details." },
        500,
      );
    }
  })

  .put("/cattle/:cattleId", async (c) => {
    const db = drizzle(c.env.DB);
    const { cattleId } = c.req.param();

    try {
      if (!cattleId) {
        return c.json(
          { success: false, message: "cattleId is required." },
          400,
        );
      }

      const body = await c.req.json();
      if (!body.name || !body.growthStage || !body.gender) {
        return c.json(
          { success: false, message: "Missing required fields." },
          400,
        );
      }

      const updateResult = await db
        .update(cattle)
        .set({
          identificationNumber: body.identificationNumber ?? null,
          earTagNumber: body.earTagNumber ?? null,
          name: body.name,
          growthStage: body.growthStage,
          birthday: body.birthday ?? null,
          age: body.age ?? null,
          monthsOld: body.monthsOld ?? null,
          daysOld: body.daysOld ?? null,
          gender: body.gender,
          score: body.score ?? null,
          breed: body.breed ?? null,
          healthStatus: body.healthStatus ?? null,
          producerName: body.producerName ?? null,
          barn: body.barn ?? null,
          breedingValue: body.breedingValue ?? null,
          notes: body.notes ?? null,
        })
        .where(eq(cattle.cattleId, Number(cattleId)))
        .run();

      if (updateResult.affectedRows === 0) {
        return c.json(
          { success: false, message: "Cattle not found or not updated." },
          404,
        );
      }

      return c.json(
        { success: true, message: "Cattle data updated successfully." },
        200,
      );
    } catch (error) {
      console.error(error);
      return c.json(
        { success: false, message: "Failed to update cattle data." },
        500,
      );
    }
  });

export type AppType = typeof routes;

type ClientType = typeof hc<AppType>;

export const createClient = (
  ...args: Parameters<ClientType>
): ReturnType<ClientType> => {
  return hc<AppType>(...args);
};

export default app;
