'use client';

import { BalanceMensualLeche } from '@/types/dashboard';
import {
    optionChartLineAnnualMilk,
    optionChartLineEarningsMilkMonth,
} from '@/utils/configCharts';
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
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
);

export const ChartEarningsMilkMonth = () => {
    const data: ChartData<'line'> = {
        labels: [
            // Date Objects
        ],
        datasets: [
            {
                label: 'Cantidad',
                data: [
                    { x: new Date('2024-03-01T03:24:00') },
                    { x: new Date('2024-03-30T03:24:00') },

                    { x: new Date('2024-03-05T03:24:00'), y: 5 },
                    { x: new Date('2024-03-15T03:24:00'), y: 30 },
                ],
            },
        ],
    };

    return <Line options={optionChartLineEarningsMilkMonth} data={data} />;
};
