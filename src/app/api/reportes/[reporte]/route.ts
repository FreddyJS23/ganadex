import { NextRequest, NextResponse } from 'next/server';
import { endpointsReports } from '@/collections/endPointsApi';
import { GetReports } from '@/services/generateReports';

type Params = {
    params: { reporte: keyof typeof endpointsReports };
};
export async function GET(
    req: NextRequest,
    { params }: Params,
): Promise<NextResponse> {
    const dateNow = new Date();
    /* Y-m-d */
  const [formatDate] = dateNow.toISOString().split('T');

    const searchParams = req.nextUrl.searchParams;
   
    const dateStart = searchParams.get('start') ?? formatDate;
    const dateEnd = searchParams.get('end') ?? formatDate;
    const idElement = searchParams.get('id') ?? '0' ;
  
    const filePdf = await GetReports(params.reporte, dateStart, dateEnd,parseInt(idElement));
    if (filePdf instanceof Blob  && filePdf.size > 0) return new NextResponse(filePdf, {
        status: 200,
        headers:{ 'content-type':'application/pdf'}
    });
    else return  NextResponse.json({message:'No se ha podido general el pdf'}, {status: 500, });
}
