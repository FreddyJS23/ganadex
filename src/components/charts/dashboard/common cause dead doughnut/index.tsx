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
}: {
    causas_frecuentes: CausaFrecuente[];
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

    return <Doughnut data={datasets} options={optionChartTotalTypesCattle} />;
};
