"use client";

import { Notification, TypesNotification } from "@/types";
import { NotificationBody } from "./item";
import { Tabs, Tab } from "@nextui-org/tabs";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { removeAllNotificationsFromDB } from "@/actions/removeAllNotificationsFromDB";
import { toast } from "sonner";
import { BadgeNotification } from "@/ui/BadgeNotification";
import IconoNotificacion from "@/icons/icono-notificacion.svg";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useSession } from "next-auth/react";

export const NotificationMain = () => {
  const containerNotificationRef: LegacyRef<HTMLDivElement> = useRef(null);

  const nameHacienda = useSession().data?.user.hacienda?.nombre;

  const [parto, setParto] = useState<Notification[]>([]);
  const [revision, setRevision] = useState<Notification[]>([]);
  const [secado, setSecado] = useState<Notification[]>([]);

  const [totalNotifications, setTotalNotifications] = useState(0);

  useEffect(() => {
    const getNotifications = async () => {
      const response = await fetch("/api/notificaciones");
      const data: TypesNotification = await response.json();
      const { parto = [], revision = [], secado = [] } = data;

      setParto(parto);
      setRevision(revision);
      setSecado(secado);
      setTotalNotifications(parto.length + revision.length + secado.length);
    };
    getNotifications();

    /* solicitar notificaciones cuando se cambie de sesion en la hacienda */
  }, [nameHacienda]);

  const removeAllNotifications = async () => {
    //evitar peticiones innecesarias al servidor
    if (totalNotifications == 0) return;

    const response = await removeAllNotificationsFromDB();
    /* manejar error del backedn y mostar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    setTotalNotifications(0);
    setParto([]);
    setRevision([]);
    setSecado([]);
  };

  const deleteNotificationState = (
    tipo: Notification["tipo"],
    index: number,
  ) => {
    //copiar el inicio del array hasta el elemento a eliminar, despues copiar el resto del array
    const deleteElementArray = (array: [], index: number) => [
      ...array.splice(0, index),
      ...array.splice(index + 1),
    ];

    if (tipo == "parto") setParto(deleteElementArray(parto as [], index));
    else if (tipo == "revision")
      setRevision(deleteElementArray(revision as [], index));
    else if (tipo == "secado")
      setSecado(deleteElementArray(secado as [], index));

    setTotalNotifications(totalNotifications - 1);
  };

  return (
    <>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <IconoNotificacion className="text-base-100 sm:text-current  size-8" />
          <BadgeNotification totalNotifications={totalNotifications} />
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
            panel:
              "h-[50vh] overflow-x-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary scrollbar-thumb-rounded-full",
          }}
        >
          <Tab title="General">
            <div ref={containerNotificationRef}>
              {parto.map((notificacion, index) => (
                <NotificationBody
                  deleteNotificationState={deleteNotificationState}
                  index={index}
                  key={notificacion.id}
                  {...notificacion}
                />
              ))}
              {revision.map((notificacion, index) => (
                <NotificationBody
                  deleteNotificationState={deleteNotificationState}
                  index={index}
                  key={notificacion.id}
                  {...notificacion}
                />
              ))}
              {secado.map((notificacion, index) => (
                <NotificationBody
                  deleteNotificationState={deleteNotificationState}
                  index={index}
                  key={notificacion.id}
                  {...notificacion}
                />
              ))}
            </div>
          </Tab>
          <Tab title="Revisiones">
            <div ref={containerNotificationRef}>
              {revision.map((notificacion, index) => (
                <NotificationBody
                  deleteNotificationState={deleteNotificationState}
                  index={index}
                  key={notificacion.id}
                  {...notificacion}
                />
              ))}
            </div>
          </Tab>
          <Tab title="Partos">
            <div ref={containerNotificationRef}>
              {parto.map((notificacion, index) => (
                <NotificationBody
                  index={index}
                  deleteNotificationState={deleteNotificationState}
                  key={notificacion.id}
                  {...notificacion}
                />
              ))}
            </div>
          </Tab>
          <Tab title="Secado">
            <div ref={containerNotificationRef}>
              {secado.map((notificacion, index) => (
                <NotificationBody
                  index={index}
                  deleteNotificationState={deleteNotificationState}
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
