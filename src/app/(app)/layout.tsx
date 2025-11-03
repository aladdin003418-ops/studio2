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
      <div className="flex h-full w-full flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4">
            <div className='flex items-center gap-2'>
                <SidebarTrigger className="md:hidden">
                    <Menu/>
                </SidebarTrigger>
                <h1 className="text-xl font-bold hidden sm:block">چت برنامه نویسان</h1>
                 <div className="sm:hidden">
                    <Logo />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
                 <div className='hidden sm:flex items-center gap-2'>
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
          </header>
          <div className="flex flex-1 overflow-hidden">
            <nav className="hidden sm:flex w-72 flex-col border-r">
                 <div className="flex h-full flex-col">
                    <div className="flex-1 overflow-y-auto py-4">
                        <div className="space-y-1 px-4">
                            {navItems.map((item) => (
                            <Link href={item.href} key={item.href} passHref>
                                <Button variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'} className="w-full justify-end">
                                    <span>{item.label}</span>
                                    <item.icon className="mr-2 h-5 w-5" />
                                </Button>
                            </Link>
                            ))}
                        </div>
                    </div>
                     <div className="border-t p-4">
                        <Button variant="ghost" onClick={handleLogout} className="w-full justify-end text-red-500 hover:text-red-600">
                           <span className="font-medium">خروج از حساب</span>
                           <LogOut className="mr-4 h-6 w-6" />
                        </Button>
                    </div>
                 </div>
            </nav>
            <main className="flex-1 overflow-hidden">{children}</main>
          </div>
      </div>
    </SidebarProvider>
  );
}
