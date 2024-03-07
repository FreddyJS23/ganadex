import { ChartOptions } from 'chart.js';

export const paletteBackground = [
    '#1FFF0090',
    '#ff481690',
    '#2dde9890',
    '#2529d890',
    '#fff00090',
    '#f2b60090',
    '#ffa60090',
];

export const optionChartTotalTypesCattle: ChartOptions<'doughnut'> = {
    plugins: {
        legend: {
            position: 'right',
            labels: { color: '#ecedee', padding: 15 },
        },
    },
    aspectRatio: 2.4,
    layout: { padding: 10 },
};
