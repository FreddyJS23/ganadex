import { ModalVaccines } from "@/components/modals/historys/available vaccines";
import { ResponseVacunas } from "@/types";
import { getData } from "@/utils/getData";

export default async function Page() {
  const { vacunas }: ResponseVacunas = await getData("vacunas");

  return <ModalVaccines vacunas={vacunas} />;
}
