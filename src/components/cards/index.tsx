import IconPreñada from '@/icons/icono-preñadas.svg';
import IconServicio from '@/icons/icono-servir.svg';
import IconRevision from '@/icons/icono-revision.svg';
import IconPersonal from '@/icons/icono-personal.svg';

type ContentCardProp = {
    title:
        | 'Vacas preñadas'
        | 'Pendiente de servir'
        | 'Pendiente de revision'
        | 'Personal';
    icon: 'pregnant' | 'serve' | 'checkUp' | 'staff';
    data: string | number;
};

type ContentCardSaleMilkProp = {
    title:
        | 'Mejor comprador'
        | 'Mejor venta'
        | 'Peor venta';
    data: string | number;
};

export const CardDashboard = ({ title, data, icon }: ContentCardProp) => {
    const icons = {
        pregnant: <IconPreñada />,
        serve: <IconServicio />,
        checkUp: <IconRevision />,
        staff: <IconPersonal />,
    };

    return (
        <div className="w-40 p-2 gap-2 bg-base-100 shadow-cards flex flex-col md:w-full lg:w-full">
            <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
                <div className="size-7 lg:order-2">{icons[icon]}</div>
                <div className="text-balance lg:hidden ">{title}</div>
                <span className="font-bold text-lg lg:order-1">{data}</span>
            </div>

            <div className="hidden text-balance lg:block">{title}</div>
        </div>
    );
};

export const CardDashboardSaleMilk = ({ title, data }: ContentCardSaleMilkProp) => {
   
    return (
        <div className="w-40 p-2 gap-2 bg-base-100 shadow-cards flex flex-col ">
            <div className='flex'>
                <span>{title}</span>
                <div className='size-4'></div>
            </div>

            <span className='font-bold text-xl'>{`${data} ${typeof data == "number" ? '$' : ''}`}</span>
            
        </div>
    );
};
