import { ModalCreateVaccine } from "@/components/modals/create-edit Vaccine";
import { ResponseVacunasDisponibles } from "@/types";
import { getData } from "@/utils/getData";

export default async function Page() {
  return <ModalCreateVaccine />;
}
