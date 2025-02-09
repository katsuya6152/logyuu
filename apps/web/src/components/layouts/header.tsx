"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/rpc";
import {
  ArrowLeft,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isCattlePage = pathname.includes("/cattle/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  const handleLogout = async () => {
    const res = await client.api.logout.$get();
    if (res.ok) {
      router.push("login");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            {isCattlePage && (
              <Button
                onClick={handleBackClick}
                variant="ghost"
                className="p-0 mr-4"
              >
                <ArrowLeft />
              </Button>
            )}

            <Link href="/">
              <Image
                src="/gyulist2.png"
                width={120}
                height={120}
                alt="logo"
                priority
              />
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          {/* <nav className="hidden md:flex items-center space-x-6 mr-10">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors"
            >
              ダッシュボード
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors"
            >
              牛一覧
            </Link>
            <Link
              href="/analytics"
              className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors"
            >
              出荷一覧
            </Link>
          </nav> */}

          {/* 検索、通知、ユーザーアイコン */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="検索..."
                className="pl-10 w-64 bg-gray-100 dark:bg-gray-800 border-none"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-6 w-6" />
                  <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5 justify-center">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>通知</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      新機能が利用可能になりました
                    </span>
                    <span className="text-sm text-gray-500">1時間前</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">プランの更新のお知らせ</span>
                    <span className="text-sm text-gray-500">1日前</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      セキュリティアップデート
                    </span>
                    <span className="text-sm text-gray-500">3日前</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-full w-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>プロフィール</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>ヘルプ＆サポート</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="検索..."
                  className="pl-10 w-full bg-gray-100 dark:bg-gray-800 border-none"
                />
              </div>
              {/* <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
              >
                ダッシュボード
              </Link>
              <Link
                href="/features"
                className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
              >
                牛一覧
              </Link>
              <Link
                href="/analytics"
                className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
              >
                出荷一覧
              </Link> */}
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
              >
                <Bell className="h-5 w-5 mr-2" />
                通知
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
              >
                <User className="h-5 w-5 mr-2" />
                プロフィール
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
              >
                <HelpCircle className="h-5 w-5 mr-2" />
                ヘルプ＆サポート
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
