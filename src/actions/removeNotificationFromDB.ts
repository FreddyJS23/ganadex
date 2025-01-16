'use server';

import { getData } from "@/utils/getData";

export const removeNotificationFromDB = async (id: number) => {

    try {
        const { notificacionID }: { notificacionID: number } = await getData('eliminarNotificacion', 'DELETE', undefined, id);
        return notificacionID;
    } catch (error) {
        if (typeof error == 'string') throw error;
        
        const { message } = error as Error;
        
        throw message;
    }


}