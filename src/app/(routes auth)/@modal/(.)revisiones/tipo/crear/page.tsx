import { ModalCreateUpdateTypeCheck } from "@/components/modals/create/type check";
import { headers } from "next/headers";

export default function Page() {
  const headersList = headers();
  const referer = headersList.get("referer");
  return <ModalCreateUpdateTypeCheck create={true} referer={referer} />;
}
