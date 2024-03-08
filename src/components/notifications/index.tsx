'use client';

import { NotificationBody } from './item';
import { Tabs, Tab } from '@nextui-org/tabs';
export const NotificationMain = () => {
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
                    <NotificationBody
                        date="12-12-2020"
                        id={3}
                        numberCattle={342}
                        type="birth"
                    />
                </Tab>
                <Tab title="Revisiones">
                    <NotificationBody
                        date="12-12-2020"
                        id={3}
                        numberCattle={342}
                        type="birth"
                    />
                </Tab>
                <Tab title="Partos">
                    <NotificationBody
                        date="12-12-2020"
                        id={3}
                        numberCattle={342}
                        type="birth"
                    />
                </Tab>
                <Tab title="Secado">
                    <NotificationBody
                        date="12-12-2020"
                        id={3}
                        numberCattle={342}
                        type="birth"
                    />
                </Tab>
            </Tabs>

            {/*  cuerpo */}
        </div>
    );
};
