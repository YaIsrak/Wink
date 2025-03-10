import ModalProvider from "@/components/provider/modal-provider";
import QueryProvider from "@/components/provider/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Wink",
    template: "%s | Wink",
  },
  description:
    "A social media platform that focuses on user interaction and real-time communication. Users can post, comment, and connect seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <QueryProvider>
            {children}
            <ModalProvider />
            <Toaster richColors theme="light" />
          </QueryProvider>
        </body>

        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID as string}
          />
        )}
      </html>
    </ClerkProvider>
  );
}
