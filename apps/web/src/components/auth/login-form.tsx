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

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "";

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
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.jwt);
        router.push("/");
      } else if (response.status === 401) {
        setErrorMessage("メールアドレスまたはパスワードが正しくありません。");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          `エラーが発生しました: ${errorData.error || "不明なエラー"}`,
        );
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
