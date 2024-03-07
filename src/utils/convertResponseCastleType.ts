import { TypesCattle } from '@/types';
import { TotalTiposGanado } from '@/types/dashboard';

export const getCastleType = (totalTypesCattle: TotalTiposGanado[]) => {
    let typesCattle: Array<keyof typeof TypesCattle> = [];
    let numberTypes: number[] = [];

    totalTypesCattle.forEach((typeCattle) => {
        let type = Object.keys(typeCattle)[0] as keyof typeof TypesCattle;
        let value = Object.values(typeCattle)[0];

        typesCattle.push(type);
        numberTypes.push(value);
    });

    return { typesCattle, numberTypes };
};
