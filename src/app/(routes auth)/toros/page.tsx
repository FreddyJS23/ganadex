import { auth } from "@/app/auth";
import { TableBull } from "@/components/tables/bull";
import { ResponseToros } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";
import { Session } from "next-auth";

export default async function Page() {
  const { toros }: ResponseToros = await submitForm("todosToro");
  const session = (await auth()) as Session;
  const role = session.user.rol;
  return (
    <>
      <TitlePage title="Toros" />
      <TableBull toros={toros} role={role} />
    </>
  );
}
