"use serve";

import { endpointsReports } from "@/collections/endPointsApi";
import { ResponseErrorNext } from "@/types";
import { RangeDatesToReports } from "@/types/forms";

export async function generateReports(
  formData: RangeDatesToReports,
  report: keyof typeof endpointsReports,
): Promise<Blob | ResponseErrorNext> {
  const file = await fetch(
    `/api/reportes/${report}?start=${formData.start}&end=${formData.end}`,
  );

  if (file.status == 200) return await file.blob();
  else return await file.json();
}
