import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chats, getUserById } from "@/lib/data";

export default function ChatListPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4">
        <h1 className="text-xl font-bold">Chats</h1>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-6 w-6" />
        </Button>
      </header>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search chats..." className="pl-10" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4">
          {chats.map((chat) => {
            const user = getUserById(chat.userId);
            const lastMessage = chat.messages[chat.messages.length - 1];
            return (
              <Link href={`/chat/${chat.id}`} key={chat.id}>
                <div className="flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate">
                    <div className="font-semibold">{user?.name}</div>
                    <p className="truncate text-sm text-muted-foreground">
                      {lastMessage.text}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                    <span>{lastMessage.timestamp}</span>
                    {chat.unreadCount > 0 && (
                      <Badge className="flex h-5 w-5 items-center justify-center rounded-full p-0">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
