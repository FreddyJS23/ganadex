import { FormCow } from '@/components/forms/create cow';
import { ResponseCompradores } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
 const { compradores }: ResponseCompradores = await getData('compradores');
    return (
        <>
            <TitlePage title="Registrar vaca" />
            <FormCow compradores={compradores} />
        </>
    );
}
