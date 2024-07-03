import { NextRequest, NextResponse } from 'next/server';

import { signOut as signOutAuthJs } from '@/auth';
import { signOutApi } from '@/services/signOutApi';

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        await signOutApi();
        return await signOutAuthJs({ redirectTo: '/login' });
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}
