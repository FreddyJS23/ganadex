import { NextResponse } from 'next/server';
import { auth as middleware } from '@/auth';

export default middleware((request) => {
    if (!request.auth) {
        if (!request.nextUrl.pathname.startsWith('/login'))
            return NextResponse.redirect(new URL('/login', request.url));
    } else {
        if (request.nextUrl.pathname.startsWith('/login'))
            return NextResponse.redirect(new URL('/dashboard', request.url));
    }
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login
         */

        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
