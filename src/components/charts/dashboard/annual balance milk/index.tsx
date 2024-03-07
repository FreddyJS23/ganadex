'use client';

import { BalanceMensualLeche } from '@/types/dashboard';
import { optionChartLineAnnualMilk } from '@/utils/configCharts';
import { getBalanceMonthFromAnnual } from '@/utils/convertResponseBalanceAnnualMilk';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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

export const ChartAnnualBalanceMilk = ({
    balanceAnual,
}: {
    balanceAnual: BalanceMensualLeche[];
}) => {
    const { balanceMonth } = getBalanceMonthFromAnnual(balanceAnual);

    const data: ChartData<'line'> = {
        labels: meses,
        datasets: [
            {
                label: 'Cantidad',
                data: balanceMonth,
            },
        ],
    };

    return <Line options={optionChartLineAnnualMilk} data={data} />;
};
