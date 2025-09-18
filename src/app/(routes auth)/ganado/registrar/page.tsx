import { FormCow } from "@/components/forms/create cow";
import {
  ResponseCausasFallecimiento,
  ResponseCompradores,
  ResponseSugerirNumero,
  ResponseVacunasDisponibles,
} from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  
  
  const response = await getData<ResponseCompradores>({endPoint:"compradores"});
  const {compradores}=responseErrorServer(response);
  
  const response2 = await getData<ResponseVacunasDisponibles>({endPoint:"vacunasDisponibles"});
  const {vacunas_disponibles}=responseErrorServer(response2);
  
  const response3 = await getData<ResponseSugerirNumero>({endPoint:"sugerirNumero"});
  const {numero_disponible}=responseErrorServer(response3);
  
  const response4 = await getData<ResponseCausasFallecimiento>({endPoint:"causasFallecimiento"});
  const {causas_fallecimiento}=responseErrorServer(response4);
  

  return (
    <>
      <TitlePage
        title="Registrar vaca"
        contentTooltip="advertencia_registro"
        iconTooltip
      />

      <FormCow
        numero_disponible={numero_disponible}
        listaVacunas={vacunas_disponibles}
        compradores={compradores}
        causas_fallecimeinto={causas_fallecimiento}
      />
    </>
  );
}
