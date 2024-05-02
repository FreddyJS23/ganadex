import { ModalCustomers } from '@/components/modals/historys/customers';
import {ResponseCompradores} from '@/types';
import { getData } from '@/utils/getData';


export default async function Page() {
    const { compradores }: ResponseCompradores = await getData('compradores');

    return <ModalCustomers compradores={compradores} />;
}
