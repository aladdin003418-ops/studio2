import { MessageSquareCode } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-2xl font-bold text-primary",
        className
      )}
    >
      <MessageSquareCode className="h-8 w-8" />
      <h1 className="font-headline">کدتالک</h1>
    </div>
  );
}
