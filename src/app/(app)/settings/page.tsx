"use client";

import {
  Bell,
  ChevronLeft,
  LogOut,
  Palette,
  ShieldCheck,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const settingsOptions = [
  { icon: User, text: "ویرایش پروفایل", hasNav: true },
  { icon: ShieldCheck, text: "تغییر رمز عبور", hasNav: true },
  { icon: Palette, text: "شخصی‌سازی ظاهر", hasNav: true },
];

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "خروج موفق",
      description: "شما با موفقیت از حساب خود خارج شدید.",
    });
    router.push('/login');
  }

  return (
    <div className="flex h-full flex-col text-right">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center justify-end gap-4 rounded-lg bg-muted/50 p-4">
            <div className="text-right">
              <h2 className="text-lg font-semibold">نام شما</h2>
              <p className="text-sm text-muted-foreground">your.email@example.com</p>
            </div>
            <Avatar className="h-16 w-16 border-2 border-background shadow">
              <AvatarImage src="https://picsum.photos/seed/0/100/100" />
              <AvatarFallback>ش</AvatarFallback>
            </Avatar>
          </div>

          {/* General Settings */}
          <div className="space-y-2">
            <h3 className="px-4 text-sm font-medium text-muted-foreground">
              حساب کاربری
            </h3>
            <div className="rounded-lg border bg-card">
              {settingsOptions.map((opt, index) => (
                <div
                  key={opt.text}
                  className={`flex items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors ${index < settingsOptions.length - 1 ? "border-b" : ""}`}
                >
                  <opt.icon className="ml-4 h-6 w-6 text-primary" />
                  <span className="flex-1 font-medium">{opt.text}</span>
                  {opt.hasNav && <ChevronLeft className="h-5 w-5 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
          
          {/* Notifications */}
          <div className="space-y-2">
            <h3 className="px-4 text-sm font-medium text-muted-foreground">
              اعلان‌ها
            </h3>
            <div className="rounded-lg border bg-card">
              <div className="flex items-center p-4">
                <Bell className="ml-4 h-6 w-6 text-primary" />
                <span className="flex-1 font-medium">فعال‌سازی اعلان‌ها</span>
                <Switch defaultChecked dir="ltr" />
              </div>
            </div>
          </div>
          
          {/* Logout */}
          <div className="rounded-lg border bg-card">
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-end p-4 text-red-500 hover:text-red-600">
               <LogOut className="ml-4 h-6 w-6" />
               <span className="font-medium">خروج از حساب</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
