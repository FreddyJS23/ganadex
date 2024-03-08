import {
    NOTIFICATION_BIRTH,
    NOTIFICATION_CHECKUP,
    NOTIFICATION_DRYING,
    NOTIFICATION_MILK_WEIGHING,
} from '../constants';

/**Mensaje de la notificacion */
type NotificationMessages = {
    birth: string;
    checkup: string;
    drying: string;
    milkWeighing: string;
};

export const notifications: NotificationMessages = {
    birth: NOTIFICATION_BIRTH,
    checkup: NOTIFICATION_CHECKUP,
    drying: NOTIFICATION_DRYING,
    milkWeighing: NOTIFICATION_MILK_WEIGHING,
};
