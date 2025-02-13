import { ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { de } from 'date-fns/locale';

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
        datalabels: { //plugin datalabels
            labels: {
                value: {
                    color: '#ecedee',
                    font: {
                        weight: 'bold',
                    }
                }
            },
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
                callback: function (value) {
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

export const optionChartLineAnnualMilk: ChartOptions<'line'> = {
    scales: {
        y: {
            beginAtZero: true,
            border: { color: '#ecedee' },
            grid: {
                color: '#ecedee30',
                display: true,
            },
            ticks: {
                color: '#ecedee',
                callback: function (value) {
                    return value + ' KG';
                },
            },
            suggestedMax: 300,
        },
        x: {
            beginAtZero: true,
            ticks: { color: '#ecedee' },
            border: { color: '#ecedee' },
            grid: {
                color: '#ecedee30',
                display: true,
            },
        },
    },
    elements: {
        line: {
            borderColor: '#22FF1E80',
            backgroundColor: '#22FF1E',
            fill: true,
            tension: 0.2,
        },
        point: { borderWidth: 20, backgroundColor: '#22FF1E' },
    },
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
    aspectRatio: 3,
};

export const optionChartLineEarningsMilkMonth: ChartOptions<'line'> = {
    parsing: {
        xAxisKey: 'fecha',
        yAxisKey: 'cantidad',
    },
    scales: {
        y: {
            beginAtZero: true,
            border: { color: '#ecedee' },
            grid: {
                color: '#ecedee30',
                display: true,
            },
            ticks: {
                color: '#ecedee',
            },
        },
        x: {
            adapters: { date: { locale: de } },
            type: 'time',
            time: { unit: 'day' },
            ticks: { color: '#ecedee' },
            border: { color: '#ecedee' },
            grid: {
                color: '#ecedee30',
                display: true,
            },
        },
    },
    elements: {
        line: {
            borderColor: '#22FF1E80',
            backgroundColor: '#22FF1E',
            fill: true,
            tension: 0.2,
        },
        point: { borderWidth: 20, backgroundColor: '#22FF1E' },
    },
    plugins: {
        legend: { display: false, labels: { color: '#ecedee' } },
        tooltip: {},
    },
    aspectRatio: 3,
};

export const optionChartLineSalesCatle: ChartOptions<'bar'> = {
    parsing: {
        xAxisKey: 'mes',
        yAxisKey: 'ventas',
    },

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
            },
            suggestedMax: 50,
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
    },
    aspectRatio: 7,
};


export const optionChartLinePartosTotales: ChartOptions<'line'> = {
    
    scales: {
        y: {
            beginAtZero: true,
            border: { color: '#ecedee' },
            grid: {
                display: false,
                color: '#ecedee',
            },
            ticks: {
                color: '#ecedee',
            },
            suggestedMax: 100,
        },
        x: {
            beginAtZero: true,
            ticks: { color: '#ecedee' },
            border: { color: '#ecedee' },
            grid: {
                display: false,
                color: '#ecedee',
                
            },
        },
    },
    
    elements: {
        line: {
            borderColor: '#22FF1E80',
            backgroundColor: '#22FF1E',
            fill: true,
            tension: 0.2,
        },
        point: { borderWidth: 20, backgroundColor: '#22FF1E' },
    },
    plugins: {
        legend: { display: false, labels: { color: '#ecedee' } },
        tooltip: {},
        datalabels: { //plugin datalabels
            anchor:'end',
            align:'top',
            labels: {
                value: {
                    color: '#ecedee',
                    font: {
                        weight: 'bold',
                        size: 12
                    }
                }
            },
        },
        title: {
            display: true,
            text: 'Nacimientos ultimos 5 años',
            color: '#ecedee',
            font: {
                size: 20,
                weight: 'bold',
                family: 'Courier New',
            },
        },
    },
    aspectRatio: 3,
};

export const optionChartBarTasaNatalidad: ChartOptions<'bar'> = {

    scales: {
        y: {
            beginAtZero: true,
            border: { color: '#ecedee' },
            grid: {
                display: false,
                color: '#ecedee',
            },
            ticks: {
                color: '#ecedee',
            },
            suggestedMax: 100,
        },
        x: {
            beginAtZero: true,
            ticks: { color: '#ecedee' },
            border: { color: '#ecedee' },
            grid: {
                display: false,
                color: '#ecedee',
                
            },
        },
    },
   
    /* elementos chart */
    plugins: {
        title: {
            display: true,
            text: 'Tasa de natalidad',
            color: '#ecedee',
            font: {
                size: 20,
                weight: 'bold',
                family: 'Courier New',
            },
        },
        datalabels: { //plugin datalabels
            formatter: function(value) {

                return value + '%';
                },
            anchor:'end',
            align:'top',
            labels: {
                value: {
                    color: '#ecedee',
                    font: {
                        weight: 'bold',
                        size: 12
                    }
                }
            },
        },
        legend: { display: false, labels: { color: '#ecedee' } },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return context.formattedValue + '%';
                },
            },
    }
},
aspectRatio:3
};


export const optionChartDoughnutCantidadGanado: ChartOptions<'doughnut'> = {
    plugins: {
        title: {
            display: true,
            text: 'Nacimientos del año seleccionado',
            color: '#ecedee',
            font: {
                size: 20,
                weight: 'bold',
                family: 'Courier New',
            },
        },
        datalabels: { //plugin datalabels
            labels: {
                value: {
                    color: '#ecedee',
                    font: {
                        weight: 'bold',
                        size: 20
                    }
                }
            },
        },
        legend: {
            position: 'right',
            labels: { color: '#ecedee', padding: 15 },
        },
        
    },
    aspectRatio: 2,
    layout: { padding: 10 },
};

