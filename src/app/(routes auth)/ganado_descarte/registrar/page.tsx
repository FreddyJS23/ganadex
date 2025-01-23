import { FormBeef } from "@/components/forms/create beef";
import { ResponseCompradores } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/utils/getData";

export default async function Page() {

    const { compradores }: ResponseCompradores = await getData('compradores');
    const { numero_disponible }: ResponseSugerirNumero = await getData('sugerirNumero');

    return (
        <>
            <TitlePage title="Registrar ganadoDescarte" />
            <FormBeef compradores={compradores} numero_disponible={numero_disponible} />
        </>
    );
}
