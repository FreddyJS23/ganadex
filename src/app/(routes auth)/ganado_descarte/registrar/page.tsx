import { FormBeef } from "@/components/forms/create beef";
import { ResponseCompradores } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/utils/getData";

export default async function Page() {

    const { compradores }: ResponseCompradores = await getData('compradores');

    return (
        <>
            <TitlePage title="Registrar ganadoDescarte" />
            <FormBeef compradores={compradores} />
        </>
    );
}
