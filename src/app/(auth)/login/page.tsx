"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/app/components/logo";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "لطفا یک آدرس ایمیل معتبر وارد کنید." }),
  password: z.string().min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "12345678",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is a mock login. In a real app, you'd call an API.
    if (values.email === "admin@example.com" && values.password === "12345678") {
      toast({
        title: "ورود موفق",
        description: "خوش آمدید!",
      });
      router.push("/chat");
    } else {
      toast({
        variant: "destructive",
        title: "خطا در ورود",
        description: "ایمیل یا رمز عبور نامعتبر است.",
      })
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز عبور</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                     <div className="text-left pt-1">
                       <Link href="/forgot-password" passHref>
                         <Button variant="link" className="px-0 h-auto py-0 text-xs">
                           رمز عبور را فراموش کرده‌اید؟
                         </Button>
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-bold">
                ورود
              </Button>
            </form>
          </Form>
          
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
