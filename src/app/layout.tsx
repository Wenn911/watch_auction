import type { Metadata } from 'next';
import './globals.css';

import { Header } from '$/containers/Header';
import { Navbar } from '$/containers/Navbar';

export const metadata: Metadata = {
    title: 'Watch Auction',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            suppressHydrationWarning
            lang="en"
        >
            <head>
                <script src="https://telegram.org/js/telegram-web-app.js?59" />
            </head>
            <body className="font-cinzel">
                <div className="grid min-h-dvh grid-rows-[auto_1fr_auto] gap-[16px_24px] pt-(--tg-content-safe-area-inset-top) pb-(--tg-content-safe-area-inset-bottom)">
                    <Header />
                    <Navbar />
                    <main className="col-start-1 -col-end-1 mx-auto my-0 w-full max-w-600 px-24">{children}</main>
                </div>
            </body>
        </html>
    );
}
