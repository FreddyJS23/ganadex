'use client';

import { vacaProductora } from '@/types/dashboard';
import { optionChartTop3CatleProduction, paletteBackground, paletteBorderColor } from '@/utils/configCharts';
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

interface ProduccionVacasTop3Props {
    vacasProductoras: vacaProductora[];
}

export const ProduccionVacasTop3 = ({
    vacasProductoras,
}: ProduccionVacasTop3Props) => {
    const { catle, production } = getTopProductionCastle(vacasProductoras);

    const data: ChartData<'bar', number[]> = {
        labels: catle,
        datasets: [
            {
                data: production,
                backgroundColor: paletteBackground,
                borderColor:paletteBorderColor,
                borderWidth:1
            },
            
        ],
    };

    return <Bar options={optionChartTop3CatleProduction} data={data} />;
};
