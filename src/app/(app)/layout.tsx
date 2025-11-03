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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Bot, MessageSquare, Settings, Wallet, LogOut, Menu, Home, Compass, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from '../components/logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SheetClose } from '@/components/ui/sheet';

const navItems = [
  { href: "/chat", icon: MessageSquare, label: "چت‌ها" },
  { href: "/wallet", icon: Wallet, label: "کیف پول" },
  { href: "/ai-assistant", icon: Bot, label: "دستیار" },
  { href: "/settings", icon: Settings, label: "تنظیمات" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        {/* Mobile Sidebar (Hamburger Menu) */}
        <Sidebar side="right" className="md:hidden" collapsible='offcanvas'>
           <SidebarHeader>
            <Logo />
            <SheetClose asChild>
                <Button variant="ghost" size="icon" className="absolute left-4 top-4">
                    <X className="h-5 w-5" />
                </Button>
            </SheetClose>
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
              <Button variant="ghost" onClick={handleLogout} className="w-full justify-end text-red-500 hover:text-red-600">
                 <span className="font-medium">خروج از حساب</span>
                 <LogOut className="mr-4 h-6 w-6" />
              </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4">
            <div className='flex items-center gap-2'>
              {/* Hamburger Trigger for Mobile */}
              <SidebarTrigger className="md:hidden">
                  <Menu/>
              </SidebarTrigger>
              <div className="sm:hidden">
                  <Logo />
              </div>
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
                 <div className='flex items-center gap-2'>
                    <div className='text-right hidden sm:block'>
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
          <main className="flex-1 overflow-hidden">{children}</main>
          
          {/* Bottom Navigation for Mobile */}
          <nav className="md:hidden flex items-center justify-around p-2 border-t bg-card">
              {navItems.map((item) => (
              <Link href={item.href} key={item.href} passHref>
                <div className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-md transition-colors w-16",
                    pathname.startsWith(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                )}>
                    <item.icon className="h-6 w-6" />
                    <span className='text-xs'>{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

        </div>
      </div>
    </SidebarProvider>
  );
}
