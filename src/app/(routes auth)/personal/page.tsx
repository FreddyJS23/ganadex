import { auth } from "@/app/auth";
import { TableStaff } from "@/components/tables/staff";
import { ResponseCargosPersonal, ResponseTodoPersonal } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { Session } from "next-auth";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  
  const response = await getData<ResponseTodoPersonal>({endPoint:"todosPersonal"});
  const {todo_personal}=responseErrorServer(response);

  const response2 = await getData<ResponseCargosPersonal>({endPoint:"cargosPersonal"});
  const {cargos_personal}=responseErrorServer(response2);
  

  const session = (await auth()) as Session;
  const nameHacienda = session.user.hacienda?.nombre ?? "";
  return (
    <section>
      <TitlePage title="Personal" />
      <TableStaff
        todo_personal={todo_personal}
        nameHacienda={nameHacienda}
        cargos_personal={cargos_personal}
      />
    </section>
  );
}
