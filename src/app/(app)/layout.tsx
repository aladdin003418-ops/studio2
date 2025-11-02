import Nav from "./nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <Nav />
    </div>
  );
}
