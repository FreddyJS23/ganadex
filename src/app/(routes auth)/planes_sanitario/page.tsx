import { SliderVaccinationDays } from '@/components/slider days vaccination';
import { TableVAccinationDay } from '@/components/tables/vaccination day';
import { WarningToast } from '@/components/warning toast';
import { DayVaccination, ResponsePlanesSanitario } from '@/types';
import { ProximosPlanSanitario } from '@/types/dashboard';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { getData } from '@/utils/getData';
import {alert} from "@nextui-org/react";

export default async function Page() {
    const { planes_sanitario }: ResponsePlanesSanitario =
        await getData('planesSanitario');

    const { proximos_planes_sanitario }: ProximosPlanSanitario =
        await getData('dashboarPlanesSanitarioProximosPlanes');

        const { planes_sanitario:planes_sanitarios_pendientes }: ResponsePlanesSanitario =
        await getData('planesSanitariosPendientes');
    
        const existsPlanesSanitario = planes_sanitarios_pendientes.length > 0;

        const vacunasPendientes:string[]=[]

       if(existsPlanesSanitario)
        ( planes_sanitarios_pendientes.forEach((planes_sanitario:DayVaccination)=>{
            vacunasPendientes.push(planes_sanitario.vacuna)
        }))

    return (
        <>
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-5 w-11/12 ">
                    <h3 className="ml-2 text-lg md:text-xl">
                        Proximos planes sanitario
                    </h3>
                    <SliderVaccinationDays
                        proximos_planes_sanitario={
                            proximos_planes_sanitario
                        }
                    />
                </div>

                <div className="flex flex-col">
                    <div className="flex  items-center justify-around">
                        <h3 className="text-lg md:text-xl">
                            Planes sanitario
                        </h3>
                        <ButtonCreateItem href={'planes_sanitario/registrar'} />
                    </div>
                    <TableVAccinationDay
                        planes_sanitario={planes_sanitario}
                    />
                </div>
                <WarningToast title="Planes sanitarios pendientes" 
            description={`Los siguientes planes sanitarios de vacunas están pendientes: ${vacunasPendientes.join(', ')}`}
            warning={existsPlanesSanitario} 
            type='plan_sanitario'
            />
            </section>
        </>
    );
}
