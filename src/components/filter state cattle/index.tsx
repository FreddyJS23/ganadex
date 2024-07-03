import IconCattle from '@/icons/icono-ganado.svg';
import IconSale from '@/icons/icono-ventas.svg';
import IconDeath from '@/icons/icono-muerte ganado.svg';

type Props = {
    cattlesDeath: () => void;
    cattlesSales: () => void;
    allCattles: () => void;
    filterActive: 'all' | 'death' | 'sales';
};

export const ButtonFilterStateCattle = ({
    cattlesDeath,
    cattlesSales,
    allCattles,
    filterActive,
}: Props) => {
    return (
        <div className="flex gap-4 p-3">
            <div
                className={`p-2 btn-ghost rounded-full cursor-pointer transition-all ${filterActive == 'all' ? 'btn-active' : ''}`}
            >
                <IconCattle className="size-8" onClick={allCattles} />
            </div>
            <div
                className={`p-2 btn-ghost rounded-full cursor-pointer transition-all ${filterActive == 'sales' ? 'btn-active' : ''}`}
            >
                <IconSale className="size-8" onClick={cattlesSales} />
            </div>
            <div
                className={`p-2 btn-ghost rounded-full cursor-pointer transition-all ${filterActive == 'death' ? 'btn-active' : ''}`}
            >
                <IconDeath className="size-8" onClick={cattlesDeath} />
            </div>
        </div>
    );
};
