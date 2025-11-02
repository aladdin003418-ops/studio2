"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Bot, Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/chat", icon: MessageSquare, label: "Chats" },
  { href: "/ai-assistant", icon: Bot, label: "Assistant" },
  { href: "/settings", icon: SettingsIcon, label: "Settings" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-t bg-card">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md p-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                isActive && "text-primary"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
