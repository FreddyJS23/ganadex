import { TitlePage } from '@/ui/TitlePage';
import { FormBull } from '@/components/forms/create bull';
import { ResponseCompradores } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    
    const { compradores }: ResponseCompradores = await getData('compradores');
    const { numero_disponible }: ResponseSugerirNumero = await getData('sugerirNumero');

    return (
        <>
            <TitlePage title="Registrar toro" />
            <FormBull compradores={compradores} numero_disponible={numero_disponible} />
        </>
    );
}
