import { TitlePage } from "@/ui/TitlePage";
import { FormBull } from "@/components/forms/create bull";
import {
  ResponseCausasFallecimiento,
  ResponseCompradores,
  ResponseSugerirNumero,
  ResponseVacunasDisponibles,
} from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response2 = await getData<ResponseCompradores>({
    endPoint: "compradores",
  });
  const { compradores } = responseErrorServer(response2);

  const response3 = await getData<ResponseSugerirNumero>({
    endPoint: "sugerirNumero",
  });
  const { numero_disponible } = responseErrorServer(response3);

  const response4 = await getData<ResponseVacunasDisponibles>({
    endPoint: "vacunasDisponibles",
  });
  const { vacunas_disponibles } = responseErrorServer(response4);

  const response5 = await getData<ResponseCausasFallecimiento>({
    endPoint: "causasFallecimiento",
  });
  const { causas_fallecimiento } = responseErrorServer(response5);

  return (
    <>
      <TitlePage
        title="Registrar toro"
        iconTooltip
        contentTooltip="advertencia_registro"
      />
      <FormBull
        compradores={compradores}
        numero_disponible={numero_disponible}
        causas_fallecimeinto={causas_fallecimiento}
        listaVacunas={vacunas_disponibles}
      />
    </>
  );
}
