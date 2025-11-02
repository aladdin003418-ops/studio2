"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/app/components/logo";

export default function LoginPage() {
  const router = useRouter();

  function handleLogin() {
    // On successful login, redirect to chat
    router.push("/chat");
  }

  return (
    <Card className="w-full">
      <CardHeader className="items-center text-center">
        <Logo className="mb-4" />
        <CardTitle>خوش آمدید!</CardTitle>
        <CardDescription>برای ادامه وارد چت برنامه نویسان شوید</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
           <Button onClick={handleLogin} type="submit" className="w-full">
              ورود
            </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          حساب کاربری ندارید؟{" "}
          <Link href="/register" passHref>
             <Button variant="link" className="px-0 h-auto py-0">
               ثبت نام کنید
             </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
