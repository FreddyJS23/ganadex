import IconCattle from '@/icons/icono-ganado1.svg';
import IconCloseNotification from '@/icons/icono-cerrar-notificacion.svg';
import { getNotificationMessage } from '@/utils';
import { TypeNotification } from '@/types';

/**body de la notificacion */
type NotificationBodyProps = {
    /** Identificador del la notificacion */
    id: number;
    /** Tipo de notificacion */
    type: keyof typeof TypeNotification;
    /** Determina la fecha que ocurrira el evento */
    date: string;
    /** Numero del ganado */
    numberCattle: number | null;
};

export const NotificationBody = ({
    date,
    type,
    numberCattle,
}: NotificationBodyProps) => {
    let notificationMessage: string = getNotificationMessage(type);

    return (
        <div className="flex gap-4 p-2 sm:p-4">
            {/*  icono */}
            <IconCattle className="size-8 text-black dark:text-white" />
            <div className="flex flex-col">
                {/*   titulo */}
                <span className="text-sm sm:text-base font-bold">
                    {type != 'milk'
                        ? `Ganado numero ${numberCattle}`
                        : 'Pesaje mensual de leche'}
                </span>
                {/*   texto */}
                {type == 'milk' && (
                    <span className="text-sm sm:text-base">
                        {notificationMessage}
                    </span>
                )}
                {type != 'milk' && (
                    <span className="text-sm sm:text-base">
                        {notificationMessage + date}
                    </span>
                )}
            </div>
            <IconCloseNotification className="size-6 text-black dark:text-white" />
        </div>
    );
};
