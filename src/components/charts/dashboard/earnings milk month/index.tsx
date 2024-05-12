'use client';


import { BalanceDiarioVentaLeche, BalanceMensualVentaLeche } from '@/types/dashboard';
import {  optionChartLineEarningsMilkMonth,} from '@/utils/configCharts';
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

export const ChartEarningsMilkMonth = ({balance_mensual}:BalanceMensualVentaLeche) => {

   const dateNow = new Date();
   const firstDayMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).toISOString();
   const lastDayMonth = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1,0).toISOString();
  
   /* Crear un array de objetos con la fecha de inicio y fin del mes actual 
   para que el chart tenga la fecha de inicio y fin del mes actual, al no colocar esto
   el chart solo mostrara las fechas obtenidas de la API, al ocurrir esto el chart en el eje x mostrara
   como la la ultima fecha la obtenida de la API, puediendo ser el dia 15 del mes, lo cual no tendreia sentido ya
    que debe ser un balance mensual */
const rangeData: BalanceDiarioVentaLeche[] = [
    { fecha: firstDayMonth,  },
    { fecha: lastDayMonth, },
];
    const data: ChartData<'line', BalanceDiarioVentaLeche[]> = {
      
        datasets: [
            {
                label: 'Cantidad',
                data:balance_mensual.concat(rangeData),
            },
        ],
    };

    return <Line options={optionChartLineEarningsMilkMonth} data={data} />;
};
