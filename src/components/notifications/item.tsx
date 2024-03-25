import IconCattle from '@/icons/icono-ganado1.svg';
import IconCloseNotification from '@/icons/icono-cerrar-notificacion.svg';
import { getNotificationMessage } from '@/utils';
import { TypeNotification } from '@/types';
import { LegacyRef, useRef } from 'react';

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
    const notificationMessage: string = getNotificationMessage(type);

    const notificationBodyRef: LegacyRef<HTMLDivElement> = useRef(null);

    const removeNotification = () => {
        notificationBodyRef.current && notificationBodyRef.current.remove();
    };

    return (
        <div ref={notificationBodyRef} className="flex gap-4 p-2 sm:p-4">
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
            <IconCloseNotification
                onClick={() => removeNotification()}
                className="size-6 text-black dark:text-white cursor-pointer"
            />
        </div>
    );
};
