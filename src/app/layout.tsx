import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/common/toaster";
import serverSideConfig from "@/config/server.config";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: serverSideConfig?.APP_NAME ?? "",
    template: `%s | ${serverSideConfig?.APP_NAME ?? ""}`,
  },
  description: serverSideConfig?.APP_NAME ?? "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster position="top-right" theme="system" />
      </body>
    </html>
  );
}
