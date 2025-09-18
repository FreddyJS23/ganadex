import { FormCow } from "@/components/forms/create cow";
import {
  ResponseCausasFallecimiento,
  ResponseCompradores,
  ResponseSugerirNumero,
  ResponseVacunasDisponibles,
} from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { compradores }: ResponseCompradores = await submitForm("compradores");
  const { vacunas_disponibles }: ResponseVacunasDisponibles =
    await submitForm("vacunasDisponibles");

  const { numero_disponible }: ResponseSugerirNumero =
    await submitForm("sugerirNumero");

  const { causas_fallecimiento }: ResponseCausasFallecimiento = await submitForm(
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
