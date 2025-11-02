import type { Metadata } from 'next';
import "./globals.css";

import { Header } from "$/containers/Header";
import { Navbar } from "$/containers/Navbar";

export const metadata: Metadata = {
    title: 'Watch Auction',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script src="https://telegram.org/js/telegram-web-app.js?59"></script>
            </head>
            <body className="font-cinzel">
                <div className="grid
        grid-rows-[auto_1fr_auto] gap-[16px_24px] min-h-dvh
        pt-(--tg-content-safe-area-inset-top) pb-(--tg-content-safe-area-inset-bottom)"
                >
                    <Header />
                    <Navbar />
                    <main className="mx-auto my-0 max-w-600 w-full col-start-1 -col-end-1">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
