import { CreateDeathCattle } from '@/components/create item in modal/create death cattle';
import { ResponseCausasFallecimiento } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    const {causas_fallecimiento}:ResponseCausasFallecimiento = await getData('causasFallecimiento');
    
    return <CreateDeathCattle causas_fallecimeinto={causas_fallecimiento} />;
}
