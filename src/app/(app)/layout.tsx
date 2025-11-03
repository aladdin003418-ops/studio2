"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Bot, MessageSquare, Settings, Wallet, LogOut, Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from '../components/logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const navItems = [
  { href: "/chat", icon: MessageSquare, label: "چت‌ها" },
  { href: "/wallet", icon: Wallet, label: "کیف پول" },
  { href: "/ai-assistant", icon: Bot, label: "دستیار" },
  { href: "/settings", icon: Settings, label: "تنظیمات" },
];

const pageTitles: { [key: string]: string } = {
  "/chat": "چت‌ها",
  "/wallet": "کیف پول",
  "/ai-assistant": "دستیار هوش مصنوعی",
  "/settings": "تنظیمات",
};

function getTitleForPath(path: string): string {
  if (path.startsWith('/chat/')) return 'گفتگو';
  return pageTitles[path] || "چت برنامه نویسان";
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  const title = getTitleForPath(pathname);

  return (
    <SidebarProvider>
      <Sidebar side="right">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    className="w-full justify-end"
                  >
                    <span>{item.label}</span>
                    <item.icon className="h-5 w-5" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className='flex items-center justify-between p-2'>
             <Button variant="ghost" size="icon" onClick={handleLogout} className="text-red-500 hover:text-red-600">
                <LogOut />
            </Button>
            <div className='flex items-center gap-2'>
                 <div className='text-right'>
                    <p className='font-semibold text-sm'>نام شما</p>
                    <p className='text-xs text-muted-foreground'>کاربر</p>
                 </div>
                 <Avatar className="h-10 w-10">
                    <AvatarImage src="https://picsum.photos/seed/0/100/100" />
                    <AvatarFallback>ش</AvatarFallback>
                </Avatar>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4">
            <div className='flex items-center gap-2'>
                <SidebarTrigger className="md:hidden">
                    <Menu/>
                </SidebarTrigger>
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <ModeToggle />
          </header>
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
