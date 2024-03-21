import { CreateSaleCattle } from '@/components/create item in modal/create sale cattle';
import { ResponseCompradores} from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { compradores }: ResponseCompradores = await getData(
        'response_compradores',
    );

    return <CreateSaleCattle ListaCompradoresRegistrados={compradores} />;
}
