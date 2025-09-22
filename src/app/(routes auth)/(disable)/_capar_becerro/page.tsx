import { TableCastreteBullCalf } from "@/components/tables/castrete bull calf";
import { ResponseCriasPendienteCapar } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  /* endpoint erroneo a proposito para no tener error de tipo */
  const response = await getData<ResponseCriasPendienteCapar>({
    endPoint: "actualizarConfig",
  });
  const { crias_pendiente_capar } = responseErrorServer(response);

  return (
    <section>
      <TitlePage title="Becerros pendiente de capar" />
      <TableCastreteBullCalf crias_pendiente_capar={crias_pendiente_capar} />
    </section>
  );
}
