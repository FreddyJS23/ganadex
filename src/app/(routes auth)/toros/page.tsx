import { auth } from "@/app/auth";
import { TableBull } from "@/components/tables/bull";
import { ResponseToros } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { Session } from "next-auth";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";


export default async function Page() {
  
  const response = await getData<ResponseToros>({endPoint:"todosToro"});
  const {toros}=responseErrorServer(response);
  
  const session = (await auth()) as Session;
  const role = session.user.rol;
  return (
    <>
      <TitlePage title="Toros" />
      <TableBull toros={toros} role={role} />
    </>
  );
}
