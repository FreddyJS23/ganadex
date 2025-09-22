import { headers } from "next/headers";
import { ModalCreateUpdateCausaFallecimiento } from "@/components/modals/tipo fallecimiento";

export default function Page() {
  const headersList = headers();
  const referer = headersList.get("referer");

  return (
    <ModalCreateUpdateCausaFallecimiento create={true} referer={referer} />
  );
}
