export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background sm:bg-muted/50 p-0 sm:p-6">
      <div className="w-full max-w-sm h-full sm:h-auto bg-card sm:bg-transparent">
        {children}
      </div>
    </div>
  );
}
