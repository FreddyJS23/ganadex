import { CreateVaccinationDay } from "@/components/create item in modal/create vaccination day";
import { ResponseVacunasDisponibles } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseVacunasDisponibles>({
    endPoint: "vacunasDisponibles",
  });
  const { vacunas_disponibles } = responseErrorServer(response);

  return <CreateVaccinationDay vacunas_disponibles={vacunas_disponibles} />;
}
