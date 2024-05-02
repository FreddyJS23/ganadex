import { FormCreateStaff } from '@/components/forms/create staff';
import { ResponseCargosPersonal } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
  const {cargos_personal}:ResponseCargosPersonal=await getData('cargosPersonal')

    return (
        <>
            <TitlePage title="Registrar personal" />

         <FormCreateStaff cargos_personal={cargos_personal} />
        </>
    );
}
