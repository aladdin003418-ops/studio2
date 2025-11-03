"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { users } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { DialogClose } from "@/components/ui/dialog";

const otherUsers = users.filter(u => u.id !== 'user-me');

export function NewChatForm({ onUserSelect }: { onUserSelect: (userId: string) => void }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!value) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفا یک کاربر را برای شروع چت انتخاب کنید.",
      });
      return;
    }
    onUserSelect(value);
    toast({
      title: "چت جدید ایجاد شد",
      description: `اکنون می‌توانید با ${otherUsers.find(u => u.id === value)?.name} گفتگو کنید.`,
    });
    // The DialogClose will be triggered by the parent button's click
  };

  return (
    <div className="grid gap-4 py-4 text-right">
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="user" className="text-right col-span-4">
          انتخاب کاربر
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between col-span-4"
            >
              <span className="truncate">
                {value
                  ? otherUsers.find((user) => user.id === value)?.name
                  : "یک کاربر را انتخاب کنید..."}
              </span>
              <ChevronsUpDown className="mr-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[375px] p-0">
            <Command>
              <CommandInput placeholder="جستجوی کاربر..." />
              <CommandList>
                <CommandEmpty>کاربری یافت نشد.</CommandEmpty>
                <CommandGroup>
                  {otherUsers.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                      className="text-right"
                    >
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4",
                          value === user.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {user.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
       <DialogClose asChild>
        <Button onClick={handleSubmit} type="submit" className="w-full mt-4">
            شروع گفتگو
        </Button>
      </DialogClose>
    </div>
  );
}
