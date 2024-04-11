import { vacaProductora } from '@/types/dashboard';

export const getTopProductionCastle = (
    topProductionCatle: vacaProductora[],
) => {
    const catle: string[] = [];
    const production: number[] = [];

    topProductionCatle.forEach(({ganado,peso_leche}) => {
        catle.push(`vaca ${ganado.numero}`);
        production.push(peso_leche);
    });

    return { catle, production };
};
