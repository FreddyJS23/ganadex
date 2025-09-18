import { TablePajuelaToro } from "@/components/tables/pajuela toro";
import { ResponsePajuelaToros } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { pajuela_toros }: ResponsePajuelaToros = await submitForm("pajuelaToro");
  return (
    <>
      <TitlePage title="Pajuela toros" />
      <section className="max-w-44 lg:max-w-4xl mx-auto">
        <TablePajuelaToro pajuela_toros={pajuela_toros} />
      </section>
    </>
  );
}
