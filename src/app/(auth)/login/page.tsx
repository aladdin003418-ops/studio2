"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/app/components/logo";
import { useToast } from "@/hooks/use-toast";
// zod and react-hook-form are no longer needed for the simplified login
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";


// Form schema is no longer needed
// const formSchema = z.object({
//   email: z.string().email({ message: "لطفا یک آدرس ایمیل معتبر وارد کنید." }),
//   password: z.string().min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد." }),
// });

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  // The form object is no longer needed
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: "admin@example.com",
  //     password: "12345678",
  //   },
  // });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault(); // Prevent default form submission
    toast({
      title: "ورود موفق",
      description: "خوش آمدید!",
    });
    router.push("/chat");
  }
  
  function handleGuestLogin() {
     toast({
        title: "ورود مهمان",
        description: "شما به عنوان کاربر مهمان وارد شدید.",
      });
    router.push("/chat");
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <Card className="w-full border-0 shadow-none sm:border-0">
        <CardHeader className="items-center text-center">
          <Logo className="mb-4" />
          <CardTitle>خوش آمدید!</CardTitle>
          <CardDescription>برای ادامه وارد چت برنامه نویسان شوید</CardDescription>
        </CardHeader>
        <CardContent>
          {/* We replace the form with a simpler structure */}
          <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2 text-right">
                <Label htmlFor="email">ایمیل</Label>
                <Input id="email" placeholder="admin@example.com" />
              </div>
               <div className="space-y-2 text-right">
                <Label htmlFor="password">رمز عبور</Label>
                <Input id="password" type="password" placeholder="••••••••" />
                 <div className="text-left pt-1">
                   <Link href="/forgot-password" passHref>
                     <Button variant="link" className="px-0 h-auto py-0 text-xs">
                       رمز عبور را فراموش کرده‌اید؟
                     </Button>
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full font-bold">
                ورود
              </Button>
            </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                یا
              </span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleGuestLogin}>
            ورود به عنوان مهمان
          </Button>

          <div className="mt-6 text-center text-sm">
            حساب کاربری ندارید؟{" "}
            <Link href="/register" passHref>
              <Button variant="link" className="px-1 h-auto py-0">
                ثبت نام کنید
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
