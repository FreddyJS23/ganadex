import { FormBeef } from "@/components/forms/create beef";
import { ResponseCompradores, ResponseSugerirNumero } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/utils/getData";

export default async function Page() {

    const { compradores }: ResponseCompradores = await getData('compradores');
    const { numero_disponible }: ResponseSugerirNumero = await getData('sugerirNumero');

    return (
        <>
            <TitlePage title="Registrar descarte" iconTooltip contentTooltip='advertencia_registro' />
            <FormBeef compradores={compradores} numero_disponible={numero_disponible} />
        </>
    );
}
