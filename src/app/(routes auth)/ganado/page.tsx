import { auth } from "@/app/auth";
import { TableCasttle } from "@/components/tables/casttle";
import { ResponseGanados } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/utils/getData";
import { Session } from "next-auth";

export default async function Page() {
  const { cabezas_ganado }: ResponseGanados = await getData("todosGanado");
  const session = (await auth()) as Session;
  const role = session.user.rol;
  return (
    <>
      <TitlePage title="Vacas" />
      <TableCasttle cabezas_ganado={cabezas_ganado} role={role} />
    </>
  );
}
