"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Plus, MoreVertical, Landmark, CreditCard, Send } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "واریز",
    amount: "۲۵۰,۰۰۰",
    description: "واریز از حساب بانکی",
    date: "۲ ساعت پیش",
    icon: <ArrowDown className="h-5 w-5 text-green-500" />,
  },
  {
    id: 2,
    type: "برداشت",
    amount: "۵۰,۰۰۰",
    description: "خرید از فروشگاه آنلاین",
    date: "دیروز",
    icon: <ArrowUp className="h-5 w-5 text-red-500" />,
  },
  {
    id: 3,
    type: "انتقال",
    amount: "۱۰۰,۰۰۰",
    description: "انتقال به سارا رضایی",
    date: "۳ روز پیش",
    icon: <Send className="h-5 w-5 text-blue-500" />,
  },
];

export default function WalletPage() {
  return (
    <div className="p-4 space-y-6 text-right">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <MoreVertical className="h-4 w-4 text-primary-foreground/70" />
          <CardTitle className="text-sm font-medium">موجودی کل</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">۱,۲۵۰,۰۰۰ تومان</div>
          <p className="text-xs text-primary-foreground/80 pt-2">
            آخرین بروزرسانی: همین الان
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3 text-center">
        <Button variant="outline" className="flex flex-col h-auto py-3 gap-2">
          <MoreVertical className="h-6 w-6" />
          <span className="text-xs">بیشتر</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-auto py-3 gap-2">
          <Send className="h-6 w-6" />
          <span className="text-xs">انتقال وجه</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-auto py-3 gap-2">
          <Plus className="h-6 w-6" />
          <span className="text-xs">افزایش موجودی</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>کارت‌های من</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <Button variant="ghost" size="sm">مدیریت</Button>
                <div className="flex items-center gap-3 text-right">
                    <div className="flex-1">
                        <p className="font-semibold">بانک سامان</p>
                        <p className="text-sm text-muted-foreground" dir="ltr">**** **** **** 1234</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-primary" />
                </div>
            </div>
             <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <Button variant="ghost" size="sm">مدیریت</Button>
                <div className="flex items-center gap-3 text-right">
                    <div>
                        <p className="font-semibold">بانک ملت</p>
                        <p className="text-sm text-muted-foreground" dir="ltr">**** **** **** 5678</p>
                    </div>
                    <Landmark className="h-8 w-8 text-primary" />
                </div>
            </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-3">تراکنش‌های اخیر</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 p-3 bg-card rounded-lg border">
              <div className="text-right">
                <p className="font-semibold font-mono">{tx.amount}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <div className="flex-1 text-right">
                <p className="font-semibold">{tx.type}</p>
                <p className="text-sm text-muted-foreground">{tx.description}</p>
              </div>
              <div className="p-2 bg-muted rounded-full">{tx.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
