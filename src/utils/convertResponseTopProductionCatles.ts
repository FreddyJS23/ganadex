import { vacaProductora } from '@/types/dashboard';

export const getTopProductionCastle = (
    topProductionCatle: vacaProductora[],
) => {
    const catle: string[] = [];
    const production: number[] = [];

    topProductionCatle.forEach((productionCatle) => {
        catle.push(`vaca ${productionCatle['numero']}`);
        production.push(productionCatle['peso_leche']);
    });

    return { catle, production };
};
