'use client';

import Slider, { Settings } from 'react-slick';
import { CardDashboardDayVaccination } from '@/components/cards';
import { ProximasJornadaVacunacion } from '@/types/dashboard';

export const SliderVaccinationDays = ({
    proximas_jornadas_vacunacion,
}: ProximasJornadaVacunacion) => {
    const calcularSlides = () => {
        let countCards=proximas_jornadas_vacunacion.length;

        if (countCards <= 3) return countCards;
        
        else if (countCards <= 6) return 3;

        while(countCards > 6)
            countCards = countCards / 2;
        ;

        return countCards;
    };
    
    const configSlider: Settings = {
        infinite: false,
        speed: 500,
        slidesToShow: calcularSlides(),
        slidesToScroll: calcularSlides(),
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
    };

    return (
        <Slider {...configSlider}>
            {proximas_jornadas_vacunacion.map(
                ({ vacuna, prox_dosis, ganado_vacunado }, index) => (
                    <CardDashboardDayVaccination
                        key={vacuna + index}
                        date={new Date(prox_dosis)}
                        title={vacuna}
                        type={ganado_vacunado}
                    />
                ),
            )}
        </Slider>
    );
};
