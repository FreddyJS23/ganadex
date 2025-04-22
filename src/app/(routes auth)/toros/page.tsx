import { auth } from "@/app/auth";
import { TableBull } from "@/components/tables/bull";
import { ResponseToros } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/utils/getData";
import { Session } from "next-auth";

export default async function Page() {
  const { toros }: ResponseToros = await getData("todosToro");
  const session = (await auth()) as Session;
  const role = session.user.rol;
  return (
    <>
      <TitlePage title="Toros" />
      <TableBull toros={toros} role={role} />
    </>
  );
}