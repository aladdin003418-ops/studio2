import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getChatById } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ChatPage({ params }: { params: { id: string } }) {
  const chat = getChatById(params.id);

  if (!chat) {
    notFound();
  }

  const { user, messages } = chat;

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-4">
        <Link href="/chat" passHref>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-6 w-6" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-bold">{user?.name}</div>
            {user?.status === "online" && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">آنلاین</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 bg-muted/20">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex max-w-[75%] flex-col gap-1",
                message.senderId === "user-me" ? "mr-auto items-start" : "ml-auto items-end"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-4 py-2 text-sm",
                  message.senderId === "user-me"
                    ? "bg-accent text-accent-foreground rounded-bl-none"
                    : "bg-card text-card-foreground rounded-br-none border"
                )}
              >
                <p>{message.text}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {message.timestamp}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>

      <footer className="flex h-16 items-center gap-2 border-t bg-card px-4">
        <Button size="icon">
          <Send className="h-5 w-5" />
        </Button>
        <Input placeholder="یک پیام بنویسید..." className="flex-1" />
      </footer>
    </div>
  );
}
