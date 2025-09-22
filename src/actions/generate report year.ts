"use serve";

import { endpointsReportsAnnual } from "@/collections/endPointsApi";
import { ResponseErrorNext } from "@/types";
import { YearToReports } from "@/types/forms";

export async function generateReportsYear(
  formData: YearToReports,
  report: keyof typeof endpointsReportsAnnual,
): Promise<Blob | ResponseErrorNext | undefined> {
  try {
    const file = await fetch(
      `/api/reportes_anual/${report}?year=${formData.year}`,
    );
    if (file.status == 200) return await file.blob();
    else throw file ?? "error";
  } catch (error) {
    const { message } = error as Error;
    throw message;
  }
}
