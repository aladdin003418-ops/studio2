"use client";

import Link from "next/link";
import { useState } from "react";
import { PlusCircle, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chats as initialChats, getUserById, type Chat } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewChatForm } from "./new-chat-form";

export default function ChatListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState<Chat[]>(initialChats);

  const filteredChats = chats.filter((chat) => {
    const user = getUserById(chat.userId);
    return user?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleNewChat = (userId: string) => {
    const existingChat = chats.find(c => c.userId === userId);
    if (!existingChat) {
      const newChat: Chat = {
        id: `chat-${chats.length + 1}`,
        userId: userId,
        unreadCount: 0,
        messages: [],
      };
      setChats(prev => [newChat, ...prev]);
    }
    // In a real app, you would navigate to the chat page:
    // router.push(`/chat/${existingChat?.id || newChat.id}`);
  }


  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="جستجوی چت‌ها..."
            className="pl-10 text-right"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4">
          {filteredChats.map((chat) => {
            const user = getUserById(chat.userId);
            if (!user) return null;
            const lastMessage = chat.messages[chat.messages.length - 1];
            return (
              <Link href={`/chat/${chat.id}`} key={chat.id}>
                <div className="flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate text-right">
                    <div className="flex items-center justify-end gap-2">
                       {chat.unreadCount > 0 && (
                        <Badge className="flex h-5 w-5 items-center justify-center rounded-full p-0">
                          {chat.unreadCount}
                        </Badge>
                      )}
                      <div className="font-semibold">{user.name}</div>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {lastMessage?.text ?? "هنوز پیامی ارسال نشده"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
       <div className="p-4 border-t">
         <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <PlusCircle className="ml-2 h-5 w-5" />
                    چت جدید
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                 <DialogHeader>
                    <DialogTitle className="text-right">شروع گفتگوی جدید</DialogTitle>
                </DialogHeader>
                <NewChatForm onUserSelect={handleNewChat} />
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
