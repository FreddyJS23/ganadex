'use client';

import { getBalanceAnnualSaleCattle } from '@/actions/getBalanceAnnualSaleCattle';
import { SelectFilterYear } from '@/components/select filter year';
import { ResponseAñosVentaGanado } from '@/types';
import {
    BalanceAnualVentaGanado,
    BalanceMensualVentaGanado,
} from '@/types/dashboard';
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
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export const SalesCatle = ({ balance_anual,años_ventas_ganado }: BalanceAnualVentaGanado & ResponseAñosVentaGanado) => {
    

    const [dataGraph, setDataGraph] = useState(balance_anual);
    

const onChange = async(select: number) => {
        try {
            const data = await getBalanceAnnualSaleCattle(
                select,
            ) as BalanceMensualVentaGanado[];
            setDataGraph(data);
        } catch (error) {
            ('error');
        }
}

    const data: ChartData<'bar', BalanceMensualVentaGanado[]> = {
        datasets: [
            {
                data: dataGraph,
                backgroundColor: paletteBackground,
                borderColor: paletteBorderColor,
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            {/* titulo */}
            <div className="flex gap-4 items-center">
                <span className="text-2xl">Ganancia anual</span>
                <div className="w-40">
                    <SelectFilterYear onChange={onChange}  label="Año" items={años_ventas_ganado} />
                </div>
            </div>
            {/* grafico */}
            <Bar options={optionChartLineSalesCatle} data={data} />;
        </>
    );
};
