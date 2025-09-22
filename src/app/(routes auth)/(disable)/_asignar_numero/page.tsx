import { TableAssignmentNumberBullCalf } from "@/components/tables/assignment number bull calf";
import { ResponseCriasPendienteNumeracion } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  /* endpoint erroneo a proposito para no tener error de tipo */
  const response = await getData<ResponseCriasPendienteNumeracion>({
    endPoint: "actualizarConfig",
  });
  const { crias_pendiente_numeracion } = responseErrorServer(response);

  return (
    <section>
      <TitlePage title="Asignación de números a becerros" />
      <TableAssignmentNumberBullCalf
        crias_pendiente_numeracion={crias_pendiente_numeracion}
      />
    </section>
  );
}
