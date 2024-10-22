import { SliderVaccinationDays } from '@/components/slider days vaccination';
import { TableVAccinationDay } from '@/components/tables/vaccination day';
import { ResponseJornadasVacunacion } from '@/types';
import { ProximasJornadaVacunacion } from '@/types/dashboard';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { jornadas_vacunacion }: ResponseJornadasVacunacion =
        await getData('jornadasVacunacion');

    const { proximas_jornadas_vacunacion }: ProximasJornadaVacunacion =
        await getData('dashboarJorndasVacunacionProximasJornadas');

    return (
        <>
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-5 w-11/12 ">
                    <h3 className="ml-2 text-lg md:text-xl">
                        Proximas jornadas de vacunacion
                    </h3>
                    <SliderVaccinationDays
                        proximas_jornadas_vacunacion={
                            proximas_jornadas_vacunacion
                        }
                    />
                </div>

                <div className="flex flex-col">
                    <div className="flex  items-center justify-around">
                        <h3 className="text-lg md:text-xl">
                            Jornadas de vacunación
                        </h3>
                        <ButtonCreateItem href={'jornadas_vacunacion/registrar'} />
                    </div>
                    <TableVAccinationDay
                        jornadas_vacunacion={jornadas_vacunacion}
                    />
                </div>
            </section>
        </>
    );
}
