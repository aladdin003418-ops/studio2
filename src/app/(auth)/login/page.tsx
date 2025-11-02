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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "نام کاربری باید حداقل ۲ کاراکتر باشد.",
  }),
  password: z.string().min(6, {
    message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // On successful login, redirect to chat
    router.push("/chat");
  }

  return (
    <Card className="w-full">
      <CardHeader className="items-center text-center">
        <Logo className="mb-4" />
        <CardTitle>خوش آمدید!</CardTitle>
        <CardDescription>برای ادامه وارد کدتالک شوید</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام کاربری</FormLabel>
                  <FormControl>
                    <Input placeholder="نام کاربری شما" {...field} />
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
                  <div className="flex justify-between items-baseline">
                    <FormLabel>رمز عبور</FormLabel>
                    <Link href="/forgot-password" passHref>
                       <Button variant="link" className="px-0 text-sm h-auto py-0">
                         رمز عبور را فراموش کرده‌اید؟
                       </Button>
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              ورود
            </Button>
          </form>
        </Form>
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
