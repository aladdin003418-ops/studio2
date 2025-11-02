import { ModeToggle } from "@/components/mode-toggle";
import Nav from "./nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-card">
       <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4">
        <div />
        <h1 className="text-xl font-bold">چت برنامه نویسان</h1>
        <ModeToggle />
      </header>
      <div className="flex-1 overflow-y-auto">{children}</div>
      <Nav />
    </div>
  );
}
