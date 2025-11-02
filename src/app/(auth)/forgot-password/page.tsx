"use client";

import Link from "next/link";
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
import { ArrowRight } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("لطفا یک آدرس ایمیل معتبر وارد کنید."),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "لینک بازیابی رمز عبور ارسال شد",
      description: `اگر حسابی برای ${values.email} وجود داشته باشد، ایمیلی حاوی دستورالعمل بازیابی دریافت خواهید کرد.`,
    });
    form.reset();
  }

  return (
    <Card className="w-full">
      <CardHeader className="items-center text-center">
        <Logo className="mb-4" />
        <CardTitle>رمز عبور خود را فراموش کرده‌اید؟</CardTitle>
        <CardDescription>
          برای دریافت لینک بازیابی، ایمیل خود را وارد کنید.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              ارسال لینک بازیابی
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          <Link href="/login" passHref>
             <Button variant="link" className="px-0 h-auto py-0">
               بازگشت به صفحه ورود
               <ArrowRight className="mr-2 h-4 w-4" />
             </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
