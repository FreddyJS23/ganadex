import { ModalCreateUpdateCausaFallecimiento } from "@/components/modals/tipo fallecimiento";
import { headers } from "next/headers";

export default function Page() {
  const headersList = headers();
  const referer = headersList.get("referer");

  return (
    <ModalCreateUpdateCausaFallecimiento create={true} referer={referer} />
  );
}
