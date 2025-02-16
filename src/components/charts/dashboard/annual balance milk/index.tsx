'use client';

import { getBalanceAnnualPrudctionMilk } from '@/actions/getBalanceAnnualPrudctionMilk';
import { SelectFilterYear } from '@/components/select filter year';
import { ResponseAñosProduccionLeche } from '@/types';
import { BalanceMensualLeche } from '@/types/dashboard';
import { optionChartLineAnnualMilk } from '@/utils/configCharts';
import { getBalanceMonthFromAnnual } from '@/utils/convertResponseBalanceAnnualMilk';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';
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
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { toast } from 'sonner';

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
    años_produccion_leche,
    children
}: {
    balanceAnual: BalanceMensualLeche[];
    años_produccion_leche:ResponseAñosProduccionLeche['años_produccion_leche'];
    children: React.ReactNode;
}) => {

    const [dataGraph, setDataGraph] = useState(getBalanceMonthFromAnnual(balanceAnual));
    
    const onChange = async (select: number) => {
    
            const data = (await getBalanceAnnualPrudctionMilk(
                select,
            ));
            
            /* manejar error del backedn y mostar mensaje */
            if('error' in data) return toast.error(messageErrorApi(data)) 
            
                setDataGraph(getBalanceMonthFromAnnual(data));
       
    };
   
    const data: ChartData<'line'> = {
        labels: meses,
        datasets: [
            {
                label: 'Cantidad',
                data: dataGraph.balanceMonth,
            },
        ],
    };

    return (
        <>
            <div className="flex justify-between">
               {children}
                <div className="w-40">
                    <SelectFilterYear
                        onChange={onChange}
                        label="Año"
                        type='yearsFromDB'
                        items={años_produccion_leche}
                    />
                </div>
            </div>
            <Line options={optionChartLineAnnualMilk} data={data} />;
        </>
    );
};
