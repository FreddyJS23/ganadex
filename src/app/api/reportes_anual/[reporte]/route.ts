import { NextRequest, NextResponse } from 'next/server';
import { endpointsReports } from '@/collections/endPointsApi';
import { GetReportsYear } from '@/services/generateReportsYear';

type Params = {
    params: { reporte: keyof typeof endpointsReports };
};
export async function GET(
    req: NextRequest,
    { params }: Params,
): Promise<NextResponse> {
    const dateNow = new Date();

    const yearNow = dateNow.getFullYear();

    const searchParams = req.nextUrl.searchParams;

    const year = searchParams.get('year') ?? yearNow;

    const filePdf = await GetReportsYear(
        params.reporte,
        typeof year == 'string' ? parseInt(year) : year,
    );
    if (filePdf instanceof Blob && filePdf.size > 0)
        return new NextResponse(filePdf, {
            status: 200,
            headers: { 'content-type': 'application/pdf' },
        });
    else
        return NextResponse.json(
            { message: 'No se ha podido generar el pdf' },
            { status: 500 },
        );
}
