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

export const paletteBorderColor = [
    '#1FFF00',
    '#ff4816',
    '#2dde98',
    '#2529d8',
    '#fff000',
    '#f2b600',
    '#ffa600',
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

export const optionChartTop3CatleProduction: ChartOptions<'bar'> = {
    /* cartesiano */
    scales: {
        y: {
            beginAtZero: true,
            border: { color: '#ecedee' },
            grid: {
                display: false,
            },
            ticks: {
                color: '#ecedee',
                callback: function (value, index, ticks) {
                    return value + ' KG';
                },
            },
            suggestedMax: 120,
        },
        x: {
            beginAtZero: true,
            ticks: { color: '#ecedee' },
            border: { color: '#ecedee' },
            grid: {
                display: false,
            },
        },
    },
    /* elementos chart */
    plugins: {
        legend: { display: false, labels: { color: '#ecedee' } },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return context.formattedValue + ' KG';
                },
            },
        },
    },
    aspectRatio: 1.7,
};
