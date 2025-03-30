import { auth } from "@/app/auth";
import { UpdateConfiguration } from "@/components/create item in modal/update configuration";
import { Session } from "next-auth";

export default async function Page() {
  const session = (await auth()) as Session;

  return <UpdateConfiguration />;
}
