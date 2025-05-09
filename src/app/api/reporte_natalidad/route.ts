import { GetReportsYear } from "@/services/generateReportsYear";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const dateNow = new Date();

  const yearNow = dateNow.getFullYear();

  const searchParams = req.nextUrl.searchParams;

  const year = searchParams.get("year") ?? yearNow;

  const formData = await req.formData();
  /* llamada api de laravel */
  const filePdf = await GetReportsYear(
    "natalidad",
    typeof year == "string" ? parseInt(year) : year,
    "POST",
    formData,
  );
  /* recibe el blob y lo retorna */
  if (filePdf instanceof Blob && filePdf.size > 0)
    return new NextResponse(filePdf, {
      status: 200,
      headers: { "content-type": "application/pdf" },
    });
  /* si el pdf no se genero devuelve el error */
    else if (typeof filePdf == "object") {
    return NextResponse.json(filePdf,{status:500});
  } else
    return NextResponse.json(
      { message: "No se ha podido generar el pdf" },
      { status: 500 },
    );
}
