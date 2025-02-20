import { FormBeef } from "@/components/forms/create beef";
import { ResponseCausasFallecimiento, ResponseCompradores, ResponseSugerirNumero, ResponseVacunasDisponibles } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/utils/getData";

export default async function Page() {

    const { compradores }: ResponseCompradores = await getData('compradores');
    const { numero_disponible }: ResponseSugerirNumero = await getData('sugerirNumero');

    const { vacunas_disponibles }: ResponseVacunasDisponibles =
    await getData('vacunasDisponibles');

        const{causas_fallecimiento}:ResponseCausasFallecimiento=await getData('causasFallecimiento')

    return (
        <>
            <TitlePage title="Registrar descarte" iconTooltip contentTooltip='advertencia_registro' />
            <FormBeef compradores={compradores} numero_disponible={numero_disponible} causas_fallecimeinto={causas_fallecimiento} listaVacunas={vacunas_disponibles} />
        </>
    );
}
