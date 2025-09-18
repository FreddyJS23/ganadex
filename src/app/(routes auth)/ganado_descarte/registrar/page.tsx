import { FormBeef } from "@/components/forms/create beef";
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
  const { numero_disponible }: ResponseSugerirNumero =
    await submitForm("sugerirNumero");

  const { vacunas_disponibles }: ResponseVacunasDisponibles =
    await submitForm("vacunasDisponibles");

  const { causas_fallecimiento }: ResponseCausasFallecimiento = await submitForm(
    "causasFallecimiento",
  );

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
