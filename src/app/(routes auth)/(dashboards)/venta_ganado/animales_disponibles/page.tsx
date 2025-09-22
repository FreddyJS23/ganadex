import type { Session } from "next-auth";
import { auth } from "@/app/auth";
import { TableDiscardedCattle } from "@/components/tables/discarded cattle";
import type { ResponseCompradores, ResponseGanadoDescartes } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseGanadoDescartes>({
    endPoint: "todosGanadoDescarte",
  });
  const { ganado_descartes } = responseErrorServer(response);

  const response2 = await getData<ResponseCompradores>({
    endPoint: "compradores",
  });
  const { compradores } = responseErrorServer(response2);

  const session = (await auth()) as Session;
  const role = session.user.rol;
  return (
    <>
      <TitlePage
        title="Ganado descarte"
        iconTooltip
        contentTooltip="ganado_descarte"
      />
      <TableDiscardedCattle
        ganado_descartes={ganado_descartes}
        role={role}
        ListaCompradoresRegistrados={compradores}
      />
      <TableDiscardedCattle
        ganado_descartes={ganado_descartes}
        role={role}
        ListaCompradoresRegistrados={compradores}
      />
    </>
  );
}
