import { CreateSaleMilk } from '@/components/create item in modal/create sale milk';
import { ResponsePreciosLeche } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { precios }: ResponsePreciosLeche = await getData('preciosLeche');

    return <CreateSaleMilk ListaPreciosRegistrados={precios} />;
}
