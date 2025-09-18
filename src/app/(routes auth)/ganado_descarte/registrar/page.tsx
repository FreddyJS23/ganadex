import { FormBeef } from "@/components/forms/create beef";
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
  
  const response2 = await getData<ResponseSugerirNumero>({endPoint:"sugerirNumero"});
  const {numero_disponible}=responseErrorServer(response2);
  
  const response3 = await getData<ResponseVacunasDisponibles>({endPoint:"vacunasDisponibles"});
  const {vacunas_disponibles}=responseErrorServer(response3);
  
  const response4 = await getData<ResponseCausasFallecimiento>({endPoint:"causasFallecimiento"});
  const {causas_fallecimiento}=responseErrorServer(response4);
  
  

  return (
    <>
      <TitlePage
        title="Registrar descarte"
        iconTooltip
        contentTooltip="advertencia_registro"
      />
      <FormBeef
        compradores={compradores}
        numero_disponible={numero_disponible}
        causas_fallecimeinto={causas_fallecimiento}
        listaVacunas={vacunas_disponibles}
      />
    </>
  );
}
