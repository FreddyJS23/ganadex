import './globals.tailwind.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';

const bebasNue = localFont({
    src: '../../public/fonts/BebasNeue-Regular.ttf',
    display: 'swap',
    variable: '--font-bebasNue',
});

const nunito = localFont({
    src: '../../public/fonts/nunito-latin-400-normal.ttf',
    display: 'swap',
    variable: '--font-nunito',
});

export const metadata: Metadata = {
    title: 'Ganadex | Gestión eficiente'
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='es' data-theme='ganadexThemeDark' className='dark'>
            <body
                className={`
                    ${nunito.variable} ${bebasNue.variable} font-nunito
                    bg-background dark:bg-background-dark
                `}>
                <Providers>
                    {children}
                    <Toaster richColors />
                </Providers>
            </body>
        </html>
    );
}
