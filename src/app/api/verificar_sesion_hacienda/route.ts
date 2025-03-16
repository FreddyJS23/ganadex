import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';

export async function GET(): Promise<NextResponse> {

    const session = await auth() as Session
    const rol = session.user.rol

    if (rol == 'admin') return redirect('/dashboard');

    else if (rol == 'veterinario') return redirect('/ganado');

    return NextResponse.json({ message: 'No se ha podido verificar la sesion' }, { status: 500 });

}
