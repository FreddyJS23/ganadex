import { ModalHistoryBirths } from '@/components/modals/history births';
import { ResponsePartos } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { partos }: ResponsePartos = await getData('response_partos');

    return <ModalHistoryBirths partos={partos} />;
}
