"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Plus, MoreVertical, Landmark, CreditCard, Send, Waves } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "واریز",
    amount: "+ ۲۵۰,۰۰۰",
    description: "واریز از حساب بانکی",
    date: "۲ ساعت پیش",
    icon: <ArrowDown className="h-5 w-5 text-green-500" />,
    color: "text-green-500",
  },
  {
    id: 2,
    type: "برداشت",
    amount: "- ۵۰,۰۰۰",
    description: "خرید آنلاین",
    date: "دیروز",
    icon: <ArrowUp className="h-5 w-5 text-red-500" />,
     color: "text-red-500",
  },
  {
    id: 3,
    type: "انتقال",
    amount: "- ۱۰۰,۰۰۰",
    description: "انتقال به سارا رضایی",
    date: "۳ روز پیش",
    icon: <Send className="h-5 w-5 text-blue-500" />,
     color: "text-red-500",
  },
];

export default function WalletPage() {
  return (
    <div className="p-4 space-y-6 text-right bg-muted/30 dark:bg-background">
      <Card className="bg-gradient-to-br from-primary to-blue-700 text-primary-foreground shadow-lg overflow-hidden relative">
         <div className="absolute -bottom-10 -right-10 w-32 h-32 opacity-20">
            <Waves className="w-full h-full" />
        </div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
           <CardTitle className="text-base font-medium">موجودی کل</CardTitle>
          <MoreVertical className="h-5 w-5 text-primary-foreground/70 cursor-pointer" />
        </CardHeader>
        <CardContent className="z-10 relative">
          <div className="text-4xl font-bold tracking-tighter">۱,۲۵۰,۰۰۰</div>
          <p className="text-lg font-bold text-primary-foreground/90 -mt-1">تومان</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3 text-center">
        <Button variant="secondary" className="flex flex-col h-auto py-3 gap-2 shadow-sm">
          <Plus className="h-6 w-6" />
          <span className="text-xs font-semibold">افزایش موجودی</span>
        </Button>
         <Button variant="secondary" className="flex flex-col h-auto py-3 gap-2 shadow-sm">
          <Send className="h-6 w-6" />
          <span className="text-xs font-semibold">انتقال وجه</span>
        </Button>
        <Button variant="secondary" className="flex flex-col h-auto py-3 gap-2 shadow-sm">
          <MoreVertical className="h-6 w-6" />
          <span className="text-xs font-semibold">بیشتر</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>کارت‌های من</CardTitle>
           <CardDescription>کارت‌های بانکی خود را مدیریت کنید</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-4 text-right">
                    <div className="p-3 bg-white rounded-md flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="font-bold">بانک سامان</p>
                        <p className="text-sm text-muted-foreground" dir="ltr">**** **** **** 1234</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm">مدیریت</Button>
            </div>
             <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
                 <div className="flex items-center gap-4 text-right">
                    <div className="p-3 bg-white rounded-md flex items-center justify-center">
                        <Landmark className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="font-bold">بانک ملت</p>
                        <p className="text-sm text-muted-foreground" dir="ltr">**** **** **** 5678</p>
                    </div>
                 </div>
                <Button variant="ghost" size="sm">مدیریت</Button>
            </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-3 px-1">تراکنش‌های اخیر</h3>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 p-3 bg-card rounded-lg border">
              <div className="p-3 bg-muted rounded-full flex items-center justify-center">{tx.icon}</div>
              <div className="flex-1 text-right">
                <p className="font-semibold">{tx.description}</p>
                <p className="text-sm text-muted-foreground">{tx.date}</p>
              </div>
              <div className={`text-left font-semibold font-mono ${tx.color}`}>
                <p>{tx.amount}</p>
              </div>
            </div>
          ))}
           <Button variant="link" className="w-full mt-2">مشاهده همه</Button>
        </div>
      </div>
    </div>
  );
}
