import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { Providers } from './providers';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${nunito.className} grid grid-cols-12   bg-background dark:bg-background-dark`}
            >
                <header className="col-span-2">
                    <Sidebar android={false} />
                </header>
                <nav className="col-span-full z-50 sm:col-start-3 sm:col-end-12 lg:translate-x-6">
                    <Navbar />
                </nav>

                <main className="mt-2 sm:col-start-2 lg:mt-0 lg:col-start-3 col-span-full ">
                    <Providers>{children}</Providers>
                </main>
            </body>
        </html>
    );
}
