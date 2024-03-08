import { notifications } from '@/collections';
import { NotificationMessageTupla } from '@/types';
import { TypeNotification } from '@/types/enums';

const notificationsArray = Object.entries(
    notifications,
) as NotificationMessageTupla[];

/** Obtener mensaje segun el tipo de notificacion
 * @param type Tipo de notificacion
 */
export const getNotificationMessage = (
    type: keyof typeof TypeNotification,
): string => {
    let message: string = '';

    for (const [key, value] of notificationsArray) {
        if (key == type) {
            message = value;
            break;
        }
    }
    return message;
};
