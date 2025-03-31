import { auth } from "@/app/auth";
import { TableStaff } from "@/components/tables/staff";
import { ResponseCargosPersonal, ResponseTodoPersonal } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/utils/getData";
import { Session } from "next-auth";

export default async function Page() {
  const { todo_personal }: ResponseTodoPersonal =
    await getData("todosPersonal");

    const { cargos_personal }: ResponseCargosPersonal =
    await getData("cargosPersonal");


  const session = (await auth()) as Session;
  const nameHacienda = session.user.hacienda?.nombre ?? "";
  return (
    <section>
      <TitlePage title="Personal" />
      <TableStaff todo_personal={todo_personal} nameHacienda={nameHacienda} cargos_personal={cargos_personal} />
    </section>
  );
}
