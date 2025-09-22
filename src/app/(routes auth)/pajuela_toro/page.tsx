import { TablePajuelaToro } from "@/components/tables/pajuela toro";
import { ResponsePajuelaToros } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponsePajuelaToros>({
    endPoint: "pajuelaToro",
  });
  const { pajuela_toros } = responseErrorServer(response);

  return (
    <>
      <TitlePage title="Pajuela toros" />
      <section className="max-w-44 lg:max-w-4xl mx-auto">
        <TablePajuelaToro pajuela_toros={pajuela_toros} />
      </section>
    </>
  );
}
