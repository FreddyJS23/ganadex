import { ModalCheckUp } from '@/components/modals/checkup';
import { ResponseRevision } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
    const { revision }: ResponseRevision = await getData(
        'response_revision',
        params.id2,
    );

    return <ModalCheckUp revision={revision} />;
}
