
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
        <main className="flex min-h-screen flex-col items-center justify-center">
            {children}
        </main>
    );
}
