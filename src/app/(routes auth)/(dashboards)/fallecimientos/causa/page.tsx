import { ModalCausasFallecimiento } from "@/components/modals/historys/causas fallecimiento";
import { ResponseCausasFallecimiento } from "@/types";
import { getData } from "@/utils/getData";

export default async function Page() {
  const { causas_fallecimiento }: ResponseCausasFallecimiento =
    await getData("tiposRevision");

  return (
    <ModalCausasFallecimiento causas_fallecimiento={causas_fallecimiento} />
  );
}
