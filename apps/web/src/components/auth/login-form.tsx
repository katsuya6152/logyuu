"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/rpc";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスを入力してください。")
    .email("有効なメールアドレスを入力してください。"),
  password: z
    .string()
    .nonempty("パスワードを入力してください。")
    .min(6, "パスワードは6文字以上である必要があります。"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);

    try {
      const res = await client.api.login.$post({
        json: { email: data.email, password: data.password },
      });

      if (res.ok) {
        const resData = await res.json();
        localStorage.setItem("token", resData.jwt);
        router.push("/cattle");
      } else if (res.status === 401) {
        setErrorMessage("メールアドレスまたはパスワードが正しくありません。");
      } else {
        setErrorMessage("エラーが発生しました:不明なエラー");
      }
    } catch (error) {
      console.error("ログイン処理中にエラーが発生しました。", error);
      setErrorMessage("通信エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">ログイン</CardTitle>
          <CardDescription>
            登録したメールアドレスとパスワードを入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">パスワード</Label>
                  <a
                    href="/"
                    className="text-gray-400 ml-auto inline-block text-xs underline-offset-4 underline pointer-events-none"
                  >
                    パスワードをお忘れですか？
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="6文字以上のパスワード"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {errorMessage && (
                <div className="text-red-500 text-xs text-center">
                  {errorMessage}
                </div>
              )}
              <Button type="submit" className="w-full">
                ログイン
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Googleでログイン
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              会員登録がお済みでない方は
              <a href="/register" className="underline underline-offset-4">
                こちら
              </a>
            </div>
            {/* TODO: デモ用のログインボタン追加 */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
