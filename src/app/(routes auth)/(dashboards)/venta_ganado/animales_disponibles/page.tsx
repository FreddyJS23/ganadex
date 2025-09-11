import type { Session } from "next-auth";
import { auth } from "@/app/auth";
import { TableDiscardedCattle } from "@/components/tables/discarded cattle";
import type { ResponseCompradores, ResponseGanadoDescartes } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/utils/getData";

export default async function Page() {
  const { ganado_descartes }: ResponseGanadoDescartes = await getData(
    "todosGanadoDescarte",
  );

  const { compradores }: ResponseCompradores = await getData("compradores");

  const session = (await auth()) as Session;
  const role = session.user.rol;
  return (
    <>
      <TitlePage
        title="Ganado descarte"
        iconTooltip
        contentTooltip="Estos animales están destinado a ser vendidos para el consumo humano"
      />
      <TableDiscardedCattle
        ganado_descartes={ganado_descartes}
        role={role}
        ListaCompradoresRegistrados={compradores}
      />
    </>
  );
}
