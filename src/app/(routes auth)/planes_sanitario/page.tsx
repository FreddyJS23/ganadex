import { SliderVaccinationDays } from '@/components/slider days vaccination';
import { TableVAccinationDay } from '@/components/tables/vaccination day';
import { ResponsePlanesSanitario } from '@/types';
import { ProximosPlanSanitario } from '@/types/dashboard';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { planes_sanitario }: ResponsePlanesSanitario =
        await getData('planesSanitario');

    const { proximos_planes_sanitario }: ProximosPlanSanitario =
        await getData('dashboarPlanesSanitarioProximosPlanes');

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
            </section>
        </>
    );
}
