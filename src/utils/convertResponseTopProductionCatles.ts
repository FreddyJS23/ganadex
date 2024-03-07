import { vacaProductora } from "@/types/dashboard";

export const getTopProductionCastle = (topProductionCatle: vacaProductora[],) => {
    let catle:string[] = [];
    let production: number[] = [];

    topProductionCatle.forEach((productionCatle) => {
       
        catle.push(`vaca ${productionCatle['numero']}`);
        production.push(productionCatle['peso_leche']);
    });

    return { catle, production };
};
