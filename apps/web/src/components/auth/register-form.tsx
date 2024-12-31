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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty("メールアドレスを入力してください。")
      .email("有効なメールアドレスを入力してください。"),
    password: z
      .string()
      .nonempty("パスワードを入力してください。")
      .min(6, "パスワードは6文字以上である必要があります。"),
    confirmPassword: z
      .string()
      .nonempty("パスワード（確認）を入力してください。")
      .min(6, "パスワードは6文字以上である必要があります。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "パスワードが一致しません。",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormValues) => {
    setErrorMessage(null);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (response.ok) {
        alert("登録成功");
        router.push("/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          `エラーが発生しました: ${errorData.error || "不明なエラー"}`,
        );
      }
    } catch (error) {
      console.error("登録エラー:", error);
      setErrorMessage("通信エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">新規会員登録</CardTitle>
          <CardDescription>
            メールアドレスとパスワードを入力して、アカウントを作成してください。
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
                <Label htmlFor="password">パスワード</Label>
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
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="確認用のパスワードを入力"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {errorMessage && (
                <div className="text-red-500 text-xs text-center">
                  {errorMessage}
                </div>
              )}
              <Button type="submit" className="w-full">
                登録
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Googleで登録
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              すでにアカウントをお持ちの方は
              <a href="/login" className="underline underline-offset-4">
                こちら
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
