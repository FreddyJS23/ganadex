import type { ChartOptions } from "chart.js";
import "chartjs-adapter-date-fns";
import { de } from "date-fns/locale";
import { LETTER_BLACK, LETTER_WHITE } from "@/constants/colorLetters";
export const paletteBackground = [
  "#1FFF0090",
  "#ff481690",
  "#2dde9890",
  "#2529d890",
  "#fff00090",
  "#f2b60090",
  "#ffa60090",
];

export const paletteBorderColor = [
  "#1FFF00",
  "#ff4816",
  "#2dde98",
  "#2529d8",
  "#fff000",
  "#f2b600",
  "#ffa600",
];




export const optionChartTotalTypesCattle = (
  darkMode: boolean,
): ChartOptions<"doughnut"> => ({
  plugins: {
    legend: {
      position: "right",
      labels: { color: darkMode ? LETTER_WHITE : LETTER_BLACK, padding: 20, },
      fullSize:false,
      align: "start",

    },
    datalabels: {
      //plugin datalabels
      labels: {
        value: {
          color: darkMode ? LETTER_WHITE : LETTER_BLACK,
          font: {
            weight: "bold",
          },
        },
      },
    },
  },
   borderColor: darkMode ? LETTER_WHITE : LETTER_BLACK,
  aspectRatio: 2.4,
  layout: { padding: 10 },
});

export const optionChartTop3CatleProduction = (
  darkMode: boolean,
): ChartOptions<"bar"> => ({
  scales: {
    y: {
      beginAtZero: true,
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: { display: false },
      ticks: {
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
        callback: (value) => value + " KG",
      },
      suggestedMax: 120,
    },
    x: {
      beginAtZero: true,
      ticks: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: { display: false },
    },
  },
  plugins: {
    legend: {
      display: false,
      labels: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
    },
    tooltip: {
      callbacks: {
        label: (context) => context.formattedValue + " KG",
      },
    },
  },
  aspectRatio: 1.7,
});

export const optionChartLineAnnualMilk = (darkMode: boolean): ChartOptions<"line"> => ({
  scales: {
    y: {
      beginAtZero: true,
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: { color: "#ecedee30", display: true },
      ticks: {
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
        callback: (value) => value + " KG",
      },
      suggestedMax: 300,
    },
    x: {
      beginAtZero: true,
      ticks: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: { color: "#ecedee30", display: true },
    },
  },
  elements: {
    line: {
      borderColor: "#22FF1E80",
      backgroundColor: "#22FF1E",
      fill: true,
      tension: 0.2,
    },
    point: { borderWidth: 20, backgroundColor: "#22FF1E" },
  },
  plugins: {
    legend: {
      display: false,
  },
    tooltip: {
      callbacks: {
        label: (context) => context.formattedValue + " KG",
      },
    },
  },
  aspectRatio: 3,
});

export const optionChartLineEarningsMilkMonth= (darkMode: boolean): ChartOptions<"line"> => ({
  parsing: {
    xAxisKey: "fecha",
    yAxisKey: "cantidad",
  },
  scales: {
    y: {
      beginAtZero: true,
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: {
        color: "#ecedee30",
        display: true,
      },
      ticks: {
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      },
    },
    x: {
      adapters: { date: { locale: de } },
      type: "time",
      time: { unit: "day" },
      ticks: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: {
        color: "#ecedee30",
        display: true,
      },
    },
  },
  elements: {
    line: {
      borderColor: "#22FF1E80",
      backgroundColor: "#22FF1E",
      fill: true,
      tension: 0.2,
    },
    point: { borderWidth: 20, backgroundColor: "#22FF1E" },
  },
  plugins: {
    legend: {
      display: false,
      labels: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
    },
    tooltip: {},
  },
  aspectRatio: 3,
});

export const optionChartLineSalesCatle= (darkMode: boolean): ChartOptions<"bar"> => ({
  parsing: {
    xAxisKey: "mes",
    yAxisKey: "ventas",
  },

  /* cartesiano */
  scales: {
    y: {
      beginAtZero: true,
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: {
        display: false,
      },
      ticks: {
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      },
      suggestedMax: 50,
    },
    x: {
      beginAtZero: true,
      ticks: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: {
        display: false,
      },
    },
  },
  /* elementos chart */
  plugins: {
    legend: {
      display: false,
      labels: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
    },
  },
  aspectRatio: 7,
});

export const optionChartLinePartosTotales= (darkMode: boolean): ChartOptions<"line"> => ({
  scales: {
    y: {
      beginAtZero: true,
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: {
        display: false,
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      },
      ticks: {
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      },
      suggestedMax: 100,
    },
    x: {
      beginAtZero: true,
      ticks: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: {
        display: false,
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      },
    },
  },

  elements: {
    line: {
      borderColor: "#22FF1E80",
      backgroundColor: "#22FF1E",
      fill: true,
      tension: 0.2,
    },
    point: { borderWidth: 20, backgroundColor: "#22FF1E" },
  },
  plugins: {
    legend: {
      display: false,
      labels: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
    },
    tooltip: {},
    datalabels: {
      //plugin datalabels
      anchor: "end",
      align: "top",
      labels: {
        value: {
          color: darkMode ? LETTER_WHITE : LETTER_BLACK,
          font: {
            weight: "bold",
            size: 12,
          },
        },
      },
    },
    title: {
      display: true,
      text: "Nacimientos ultimos 5 años",
      color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      font: {
        size: 20,
        weight: "bold",
        family: "Courier New",
      },
    },
  },
  aspectRatio: 3,
});

export const optionChartBarTasaNatalidad=(darkMode: boolean): ChartOptions<"bar"> => ({
  scales: {
    y: {
      beginAtZero: true,
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: {
        display: false,
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      },
      ticks: {
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      },
      suggestedMax: 100,
    },
    x: {
      beginAtZero: true,
      ticks: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      border: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
      grid: {
        display: false,
        color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      },
    },
  },

  /* elementos chart */
  plugins: {
    title: {
      display: true,
      text: "Tasa de natalidad",
      color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      font: {
        size: 20,
        weight: "bold",
        family: "Courier New",
      },
    },
    datalabels: {
      //plugin datalabels
      formatter: (value) => value + "%",
      anchor: "end",
      align: "top",
      labels: {
        value: {
          color: darkMode ? LETTER_WHITE : LETTER_BLACK,
          font: {
            weight: "bold",
            size: 12,
          },
        },
      },
    },
    legend: {
      display: false,
      labels: { color: darkMode ? LETTER_WHITE : LETTER_BLACK },
    },
    tooltip: {
      callbacks: {
        label: (context) => context.formattedValue + "%",
      },
    },
  },
  aspectRatio: 3,
});

export const optionChartDoughnutCantidadNacimientos=(darkMode: boolean): ChartOptions<"doughnut"> => ({
  plugins: {
    title: {
      display: true,
      text: "Nacimientos del año seleccionado",
      color: darkMode ? LETTER_WHITE : LETTER_BLACK,
      font: {
        size: 20,
        weight: "bold",
        family: "Courier New",
      },
    },
    datalabels: {
      //plugin datalabels
      labels: {
        value: {
          color: darkMode ? LETTER_WHITE : LETTER_BLACK,
          font: {
            weight: "bold",
            size: 20,
          },
        },
      },
    },
    legend: {
      position: "right",
      labels: { color: darkMode ? LETTER_WHITE : LETTER_BLACK, padding: 15 },
    },
  },
  aspectRatio: 2,
  layout: { padding: 10 },
  borderColor: darkMode ? LETTER_WHITE : LETTER_BLACK,
});
