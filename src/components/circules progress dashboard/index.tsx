import { CircularProgress as CircularProgressNextui } from '@nextui-org/react';

interface CircularProgressProps {
    /**Valor dentro del circulo   */
    value: number;
    /**Determina si el circulo representara tendra color positivamente o negativamente   */
    positive: boolean;
    /**Label debajo del circulo   */
    label: string;
    /**Rango maximo del circulo, util cuando se tiene dos elementos y se desea
       que los dos tengan el mismo rango maximo   */
    rangeMaxValue: number;
}

export const CircularProgress = ({
    value,
    positive,
    label,
    rangeMaxValue,
}: CircularProgressProps) => {
    let maxValue = 20;

    if (rangeMaxValue >= 20 && rangeMaxValue < 50) maxValue = 50;
    else if (rangeMaxValue >= 50 && rangeMaxValue < 100) maxValue = 100;
    else if (rangeMaxValue >= 100 && rangeMaxValue < 150) maxValue = 150;
    else if (rangeMaxValue >= 150) maxValue = 200;

    return (
        <CircularProgressNextui
            label={label}
            classNames={{
                svg: 'w-40 h-40 drop-shadow-md',

                /*  track: `${positive ?  'stroke-primary' : 'stroke-error'}`, */
                value: 'text-xl font-semibold',
            }}
            value={value}
            showValueLabel={true}
            color={`${positive ? 'primary' : 'danger'}`}
            formatOptions={{ style: 'decimal' }}
            maxValue={maxValue}
        />
    );
};
