import IconRevision from '@/icons/icono-revision.svg';
import IconServicio from '@/icons/icono-servir.svg';
import IconParto from '@/icons/icono-preñadas.svg';
import IconLeche from '@/icons/icono-leche.svg';

type TitleTabProps = {
    title: string;
    icon?: 'checkUp' | 'serve' | 'pregnant' | 'milk';
};

export const TitleTab = ({title,icon}:TitleTabProps) => {
   
    const icons = {
        checkUp: <IconRevision />,
        serve: <IconServicio />,
        pregnant: <IconParto />,
        milk: <IconLeche />,
    };

    return (
        <div className="flex items-center space-x-2 ">
            <span className='hidden sm:block'>{title}</span>
           {icon && <div className='size-7'>
                {icons[icon]}
            </div>}
        </div>
    );
};
