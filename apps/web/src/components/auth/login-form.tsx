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
import React from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "";

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password);

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.jwt);
      alert(`ログイン成功: ${data.message}`);
      router.push("/");
    } else {
      const errorData = await response.json();
      alert(`ログイン失敗: ${errorData.error}`);
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
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">パスワード</Label>
                  <a
                    href="/"
                    className="text-gray-400 ml-auto inline-block text-xs underline-offset-4 underline"
                  >
                    パスワードをお忘れですか？
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
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
}
