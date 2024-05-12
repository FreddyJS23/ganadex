'use client';

import { BalanceAnualVentaGanado, BalanceMensualVentaGanado } from '@/types/dashboard';
import {
    optionChartLineSalesCatle,
    paletteBackground,
    paletteBorderColor,
} from '@/utils/configCharts';
import { ChartData } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);


export const SalesCatle = ({balance_anual}:BalanceAnualVentaGanado) => {
   
    const data: ChartData<'bar', BalanceMensualVentaGanado[]> = {
        datasets: [
            {
                data: balance_anual,
                backgroundColor: paletteBackground,
                borderColor: paletteBorderColor,
                borderWidth: 1,
            },
        ],
    };

    return <Bar options={optionChartLineSalesCatle} data={data} />;
};
