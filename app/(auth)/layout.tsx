import NavBrand from "@/components/layout/NavBrand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center">{children}</div>
      <div className="hidden flex-col items-start justify-center bg-primary text-white md:flex">
        <div className="mx-auto space-y-2">
          <NavBrand href="/" theme="dark" />
          <h1 className="text-5xl font-bold">Welcome to Wink</h1>
          <p>Login to continue</p>
        </div>
      </div>
    </main>
  );
}
