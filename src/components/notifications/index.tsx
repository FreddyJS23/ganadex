'use client';

import { Notification, TypesNotification } from '@/types';
import { NotificationBody } from './item';
import { Tabs, Tab } from '@nextui-org/tabs';
import { LegacyRef, useRef, useState } from 'react';
import { removeAllNotificationsFromDB } from '@/actions/removeAllNotificationsFromDB';
import { toast } from 'sonner';
import { BadgeNotification } from '@/ui/BadgeNotification';
import IconoNotificacion from '@/icons/icono-notificacion.svg';


export const NotificationMain = (notifications: TypesNotification) => {
    const containerNotificationRef: LegacyRef<HTMLDivElement> = useRef(null);

    const removeAllNotifications = () => {
        while (containerNotificationRef.current?.firstChild) {
            containerNotificationRef.current.removeChild(
                containerNotificationRef.current.firstChild,
            );
        }
    };
    const {parto:partoNotifications,revision:revisionNotifications,secado:secadoNotifications}=notifications
    const [parto, setParto] = useState(partoNotifications ?? []);
    const [revision, setRevision] = useState(revisionNotifications ?? []);
    const [secado, setSecado] = useState(secadoNotifications ?? []);

    const [totalNotifications, setTotalNotifications] = useState( parto.length + revision.length + secado.length)
    

    return (
       <>
        <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle"
    >
        <div className="indicator">
            <IconoNotificacion className="text-base-100 sm:text-current  size-8" />
            <BadgeNotification
                totalNotifications={totalNotifications}
            />
        </div>
    </div>
        
        <div
            tabIndex={0}
            className="mt-3 p-4  dropdown-content w-72 sm:w-auto bg-base-100"
        >
            {/*  cabezera */}
            <div className="flex items-center justify-between">
                <h4 className="  sm:text-xl  font-bold">Notificaciones</h4>
                <p
                    className="text-sm sm:text-base cursor-pointer"
                    onClick={() => removeAllNotifications()}
                >
                    Omitir todo
                </p>
            </div>

            {/* secciones */}
            <Tabs
                variant="underlined"
                color="primary"
                fullWidth={true}
                classNames={{
                    panel: 'h-[50vh] overflow-x-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary scrollbar-thumb-rounded-full',
                }}
            >
                <Tab title="General">
                    <div ref={containerNotificationRef}>
                        {parto.map((notificacion) => (
                            <NotificationBody
                                key={notificacion.id}
                                {...notificacion}
                            />
                        ))}
                        {revision.map((notificacion) => (
                            <NotificationBody
                                key={notificacion.id}
                                {...notificacion}
                            />
                        ))}
                        {secado.map((notificacion) => (
                            <NotificationBody
                                key={notificacion.id}
                                {...notificacion}
                            />
                        ))}
                    </div>
                </Tab>
                <Tab title="Revisiones">
                    <div ref={containerNotificationRef}>
                        {revision.map((notificacion) => (
                            <NotificationBody
                                key={notificacion.id}
                                {...notificacion}
                            />
                        ))}
                    </div>
                </Tab>
                <Tab title="Partos">
                    <div ref={containerNotificationRef}>
                        {parto.map((notificacion) => (
                            <NotificationBody
                                key={notificacion.id}
                                {...notificacion}
                            />
                        ))}
                    </div>
                </Tab>
                <Tab title="Secado">
                    <div ref={containerNotificationRef}>
                        {secado.map((notificacion) => (
                            <NotificationBody
                                key={notificacion.id}
                                {...notificacion}
                            />
                        ))}
                    </div>
                </Tab>
            </Tabs>

            {/*  cuerpo */}
        </div>
       </>
    );
};
