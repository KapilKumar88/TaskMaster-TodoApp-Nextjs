import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/common/toaster";
import serverSideConfig from "@/config/server.config";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
