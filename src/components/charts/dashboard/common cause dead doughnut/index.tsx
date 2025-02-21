'use client';

import { CausaFrecuente } from '@/types/dashboard';
import {
    optionChartTotalTypesCattle,
    paletteBackground,
} from '@/utils/configCharts';
import { getCommonCausesDeadAndTotalDead } from '@/utils/convertResponseCommonCauseDead';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TortaCausasFallecimientosGanado = ({
    causas_frecuentes,
    total_fallecidos
}: {
    causas_frecuentes: CausaFrecuente[];
    total_fallecidos: number;
}) => {
    const { causeDead, totalDead } =
        getCommonCausesDeadAndTotalDead(causas_frecuentes);

    const datasets: ChartData<'doughnut', number[]> = {
        labels: causeDead,
        datasets: [
            {
                label: 'Total',
                data: totalDead,
                backgroundColor: paletteBackground,
            },
        ],
    };

        const darkMode=document &&  document.documentElement.classList.contains('dark');
const letterWhite='#e5e7eb'
const letterBlack='#111827'


    const configAnotation={annotation: { //plugin anotaciones
        annotations: {
            dLabel: {
                type: 'doughnutLabel',
                content: ({chart}) => ['Total',
                   total_fallecidos,
                  ],
                font:[{size:20,weight:'bold'},{size:18,weight:'normal'}],
                color:darkMode ? letterWhite : letterBlack
            }
        }
    }}

     //destructurar options
        //primero se destructura el objeto de opciones
        //luego se crear un nuevo objecto con la propiedad plugins
        //se destructora el objeto de plugins
        //y se añade el plugin anotaciones
        const options={...optionChartTotalTypesCattle,plugins:{...optionChartTotalTypesCattle.plugins,...configAnotation}}

    return <Doughnut data={datasets} options={options} />;
};
