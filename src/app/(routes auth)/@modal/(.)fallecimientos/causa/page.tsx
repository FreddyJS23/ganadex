import { ModalCausasFallecimiento } from "@/components/modals/historys/causas fallecimiento";
import { ResponseCausasFallecimiento } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { causas_fallecimiento }: ResponseCausasFallecimiento = await submitForm(
    "causasFallecimiento",
  );

  return (
    <ModalCausasFallecimiento causas_fallecimiento={causas_fallecimiento} />
  );
}
