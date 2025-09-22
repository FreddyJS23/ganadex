import { headers } from "next/headers";
import { CreateCustomer } from "@/components/create item in modal/create customer";

export default async function Page() {
  const headersList = headers();
  const referer = headersList.get("referer");

  return <CreateCustomer referer={referer} />;
}
