import { NextRequest, NextResponse } from 'next/server';

import { signOut as signOutAuthJs } from '@/auth';
import { signOutApi } from '@/services/signOutApi';
import { redirect } from 'next/navigation';

export async function GET(): Promise<NextResponse> {
       await signOutApi();
       await signOutAuthJs({ 'redirect':false });
        
        return redirect('/login')
}
