"use client";

import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { notFound } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns-jalali";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getChatById, type Message } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ChatPage({ params }: { params: { id: string } }) {
  const chatData = getChatById(params.id);

  const [chat, setChat] = useState(chatData);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [chat?.messages]);


  if (!chat) {
    notFound();
  }

  const { user, messages } = chat;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      senderId: "user-me",
      timestamp: format(new Date(), "HH:mm"),
    };

    setChat((prevChat) => {
      if (!prevChat) return null;
      return {
        ...prevChat,
        messages: [...prevChat.messages, newMsg],
      };
    });

    setNewMessage("");
  };

  return (
    <div className="flex h-full flex-col">
       {/* This header is only visible on mobile, the main header is in layout.tsx */}
      <header className="flex md:hidden h-16 shrink-0 items-center justify-between gap-4 border-b bg-card px-4">
        <Link href="/chat" passHref>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="flex items-center gap-3 text-right">
          <div>
            <div className="font-bold">{user?.name}</div>
            {user?.status === "online" && (
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-xs text-muted-foreground">آنلاین</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
            )}
          </div>
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <ScrollArea className="flex-1 bg-muted/30" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex max-w-[80%] flex-col gap-1",
                message.senderId !== "user-me"
                  ? "mr-auto items-start"
                  : "ml-auto items-end"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-4 py-2 text-sm shadow-md",
                   message.senderId !== "user-me"
                    ? "bg-card text-card-foreground rounded-br-none"
                    : "bg-primary text-primary-foreground rounded-bl-none"
                )}
              >
                <p className="text-right">{message.text}</p>
              </div>
              <span className="text-xs text-muted-foreground px-1">
                {message.timestamp}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>

      <footer className="flex h-16 items-center gap-2 border-t bg-card px-4">
        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
          <Button type="submit" size="icon" className="rounded-full flex-shrink-0">
            <Send className="h-5 w-5" />
          </Button>
          <Input
            placeholder="یک پیام بنویسید..."
            className="flex-1 text-right rounded-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </form>
      </footer>
    </div>
  );
}
