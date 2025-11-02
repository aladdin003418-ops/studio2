import {
  Bell,
  ChevronLeft,
  LogOut,
  ShieldCheck,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const settingsOptions = [
  { icon: ShieldCheck, text: "تغییر رمز عبور", hasNav: true },
];

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
             <Button variant="ghost" size="icon" className="mr-auto">
              <User className="h-5 w-5" />
            </Button>
            <div className="text-right">
              <h2 className="text-lg font-semibold">نام شما</h2>
              <p className="text-sm text-muted-foreground">your.email@example.com</p>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://picsum.photos/seed/0/100/100" />
              <AvatarFallback>ش</AvatarFallback>
            </Avatar>
          </div>

          {/* General Settings */}
          <div className="space-y-2">
            <h3 className="px-4 text-sm font-medium text-muted-foreground">
              عمومی
            </h3>
            <div className="rounded-lg border bg-card">
              {settingsOptions.map((opt, index) => (
                <div
                  key={opt.text}
                  className={`flex items-center p-4 ${index < settingsOptions.length - 1 ? "border-b" : ""}`}
                >
                  {opt.hasNav && <ChevronLeft className="h-5 w-5 text-muted-foreground" />}
                  <span className="flex-1 font-medium">{opt.text}</span>
                  <opt.icon className="ml-4 h-6 w-6 text-primary" />
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
                 <Switch defaultChecked dir="ltr" />
                <span className="flex-1 font-medium">فعال‌سازی اعلان‌ها</span>
                <Bell className="ml-4 h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Logout */}
          <div className="rounded-lg border bg-card">
            <Button variant="ghost" className="w-full justify-start p-4 text-red-500 hover:text-red-600">
               <span className="font-medium">خروج</span>
               <LogOut className="ml-4 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
