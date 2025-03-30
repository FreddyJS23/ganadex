import {
  NOTIFICATION_BIRTH,
  NOTIFICATION_CHECKUP,
  NOTIFICATION_DRYING,
} from "../constants";
import { TypeNotification } from "@/types";

export const notifications: {
  [Property in keyof typeof TypeNotification]: string;
} = {
  parto: NOTIFICATION_BIRTH,
  revision: NOTIFICATION_CHECKUP,
  secado: NOTIFICATION_DRYING,
};
