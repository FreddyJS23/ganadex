import { GetBackup } from '@/services/backupBd';
import { NextResponse } from 'next/server';


export async function GET(): Promise<NextResponse> {

    const fileZip = await GetBackup();
    if (fileZip instanceof Blob && fileZip.size > 0)
        return new NextResponse(fileZip, {
            status: 200,
            headers: { 'content-type': 'application/zip' },
        });
    else
        return NextResponse.json(
            { message: 'No se ha podido general el respaldo' },
            { status: 500 },
        );
}
