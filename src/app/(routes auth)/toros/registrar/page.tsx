import { TitlePage } from '@/ui/TitlePage';
import { FormBull } from '@/components/forms/create bull';
import { ResponseCausasFallecimiento, ResponseCompradores, ResponseSugerirNumero, ResponseVacunasDisponibles } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    
    const { compradores }: ResponseCompradores = await getData('compradores');
    const { numero_disponible }: ResponseSugerirNumero = await getData('sugerirNumero');
    const { causas_fallecimiento }: ResponseCausasFallecimiento = await getData('causasFallecimiento');

    const { vacunas_disponibles }: ResponseVacunasDisponibles =
    await getData('vacunasDisponibles');

    return (
        <>
            <TitlePage title="Registrar toro" iconTooltip contentTooltip='advertencia_registro' />
            <FormBull compradores={compradores} numero_disponible={numero_disponible} causas_fallecimeinto={causas_fallecimiento} listaVacunas={vacunas_disponibles} />
        </>
    );
}
