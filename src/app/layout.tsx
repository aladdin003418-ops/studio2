import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CodeTalk",
  description: "A chat app for programmers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased")}>
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border">
            <div className="flex h-[85vh] min-h-[640px] w-full flex-col">
              {children}
            </div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
