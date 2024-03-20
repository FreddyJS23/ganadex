import { TableCastreteBullCalf } from '@/components/tables/castrete bull calf ';
import { ResponseCriasPendienteCapar } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { crias_pendiente_capar }: ResponseCriasPendienteCapar =
        await getData('response_criasPendienteCapar');

    return (
        <section>
            <TitlePage title="Becerros pendiente de capar" />
            <TableCastreteBullCalf
                crias_pendiente_capar={crias_pendiente_capar}
            />
        </section>
    );
}
