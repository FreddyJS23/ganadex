'use client';

import { ResponseNotificaciones } from '@/types';
import { NotificationBody } from './item';
import { Tabs, Tab } from '@nextui-org/tabs';
import { LegacyRef, useRef } from 'react';

export const NotificationMain = ({
    partos,
    revisiones,
    secados,
}: ResponseNotificaciones) => {
    const containerNotificationRef: LegacyRef<HTMLDivElement> = useRef(null);
    return (
        <div
            tabIndex={0}
            className="mt-3 p-4  dropdown-content w-72 sm:w-auto bg-base-100"
        >
            {/*  cabezera */}
            <div className="flex items-center justify-between">
                <h4 className="  sm:text-xl  font-bold">Notificaciones</h4>
                <p className="text-sm sm:text-base">Omitir todo</p>
            </div>

            {/* secciones */}
            <Tabs variant="underlined" color="primary" fullWidth={true}>
                <Tab title="General">
                    <div ref={containerNotificationRef}>
                        {partos.map(({ id, fecha, numero }) => (
                            <NotificationBody
                                key={id}
                                date={fecha}
                                id={id}
                                numberCattle={numero}
                                type="birth"
                            />
                        ))}
                        {revisiones.map(({ id, fecha, numero }) => (
                            <NotificationBody
                                key={id}
                                date={fecha}
                                id={id}
                                numberCattle={numero}
                                type="checkup"
                            />
                        ))}
                        {secados.map(({ id, fecha, numero }) => (
                            <NotificationBody
                                key={id}
                                date={fecha}
                                id={id}
                                numberCattle={numero}
                                type="drying"
                            />
                        ))}
                    </div>
                </Tab>
                <Tab title="Revisiones">
                    <div ref={containerNotificationRef}>
                        {revisiones.map(({ id, fecha, numero }) => (
                            <NotificationBody
                                key={id}
                                date={fecha}
                                id={id}
                                numberCattle={numero}
                                type="checkup"
                            />
                        ))}
                    </div>
                </Tab>
                <Tab title="Partos">
                    <div ref={containerNotificationRef}>
                        {partos.map(({ id, fecha, numero }) => (
                            <NotificationBody
                                key={id}
                                date={fecha}
                                id={id}
                                numberCattle={numero}
                                type="birth"
                            />
                        ))}
                    </div>
                </Tab>
                <Tab title="Secado">
                    <div ref={containerNotificationRef}>
                        {secados.map(({ id, fecha, numero }) => (
                            <NotificationBody
                                key={id}
                                date={fecha}
                                id={id}
                                numberCattle={numero}
                                type="drying"
                            />
                        ))}
                    </div>
                </Tab>
            </Tabs>

            {/*  cuerpo */}
        </div>
    );
};
