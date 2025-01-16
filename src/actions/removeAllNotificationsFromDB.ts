'use server';

import { getData } from "@/utils/getData";

export const removeAllNotificationsFromDB =async () => {

    try {
        await getData('eliminarTodasNotificaciiones','GET');
        return 200;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }


}