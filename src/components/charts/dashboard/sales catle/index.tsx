'use client';

import { vacaProductora } from '@/types/dashboard';
import {
    optionChartLineSalesCatle,
    optionChartTop3CatleProduction,
    paletteBackground,
    paletteBorderColor,
} from '@/utils/configCharts';
import { getTopProductionCastle } from '@/utils/convertResponseTopProductionCatles';
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

const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

export const SalesCatle = () => {
    const data: ChartData<'bar', number[]> = {
        labels: meses,
        datasets: [
            {
                data: [2, 5],
                backgroundColor: paletteBackground,
                borderColor: paletteBorderColor,
                borderWidth: 1,
            },
        ],
    };

    return <Bar options={optionChartLineSalesCatle} data={data} />;
};
