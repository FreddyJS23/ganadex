import IconCattle from "@/icons/icono-ganado1.svg";
import IconCloseNotification from "@/icons/icono-cerrar-notificacion.svg";
import { getNotificationMessage } from "@/utils";
import type { Notification } from "@/types";
import { LegacyRef, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { removeNotificationFromDB } from "@/actions/removeNotificationFromDB";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";

/**body de la notificación */
type NotificationBodyProps = Notification & {
  deleteNotificationState: (tipo: Notification["tipo"], index: number) => void;
  index: number;
};

export const NotificationBody = ({
  id,
  dias_para_evento,
  ganado,
  tipo,
  index,
  deleteNotificationState,
}: NotificationBodyProps) => {
  const eventPast = Math.sign(dias_para_evento) == -1 ? true : false;
  const notificationMessageEventPast: string =
    "Ya pasaron " +
    Math.abs(dias_para_evento) +
    " días desde que se tuvo que hacer " +
    getNotificationMessage(tipo).replace("para", " ");
  const notificationMessage: string =
    "Faltan " +
    Math.abs(dias_para_evento) +
    " días para" +
    getNotificationMessage(tipo);

  const removeNotification = async () => {
    const response = await removeNotificationFromDB(id);
    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    deleteNotificationState(tipo, index);
  };

  return (
    <div className="flex gap-4 p-2 sm:p-4">
      {/*  icono */}
      <IconCattle className="size-8 text-black dark:text-white" />
      <div className="flex flex-col">
        {/*   titulo */}
        <span className="text-sm sm:text-base font-bold">
          <Link href={`ganado/${ganado.id}`}>{"Vaca " + ganado.numero}</Link>
        </span>
        {/*   texto */}
        <span className="text-sm sm:text-base">
          {eventPast ? notificationMessageEventPast : notificationMessage}
        </span>
      </div>
      <IconCloseNotification
        onClick={() => removeNotification()}
        className="size-6 text-black dark:text-white cursor-pointer"
      />
    </div>
  );
};
