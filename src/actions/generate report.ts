"use serve";

import { endpointsReports } from "@/collections/endPointsApi";
import { ResponseError } from "@/types";
import { RangeDatesToReports } from "@/types/forms";

export async function generateReports(
  formData: RangeDatesToReports,
  report: keyof typeof endpointsReports,
): Promise<Blob | ResponseError | undefined> {
  try {
    const file = await fetch(
      `/api/reportes/${report}?start=${formData.start}&end=${formData.end}`,
    );
    if (file.status == 200) return await file.blob();
    else throw file ?? "error";
  } catch (error) {
    const { message } = error as Error;
    throw message;
  }
}
