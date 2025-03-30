import { FormCow } from "@/components/forms/create cow";
import {
  ResponseCausasFallecimiento,
  ResponseCompradores,
  ResponseSugerirNumero,
  ResponseVacunasDisponibles,
} from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/utils/getData";

export default async function Page() {
  const { compradores }: ResponseCompradores = await getData("compradores");
  const { vacunas_disponibles }: ResponseVacunasDisponibles =
    await getData("vacunasDisponibles");

  const { numero_disponible }: ResponseSugerirNumero =
    await getData("sugerirNumero");

  const { causas_fallecimiento }: ResponseCausasFallecimiento = await getData(
    "causasFallecimiento",
  );

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
