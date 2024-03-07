'use client';

import { ResponseTotalTiposGanado } from '@/types/dashboard';
import {
    optionChartTotalTypesCattle,
    paletteBackground,
} from '@/utils/configCharts';
import { getCastleType } from '@/utils/convertResponseCastleType';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TortaTipoGanado = ({ total_tipos_ganado }: ResponseTotalTiposGanado) => {
    const { numberTypes, typesCattle } = getCastleType(total_tipos_ganado);

    const datasets: ChartData<'doughnut', number[]> = {
        labels: typesCattle,
        datasets: [
            {
                label: 'Total',
                data: numberTypes,
                backgroundColor: paletteBackground,
            },
        ],
    };

    return <Doughnut data={datasets} options={optionChartTotalTypesCattle} />;
};
