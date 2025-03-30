"use server";

import { getData } from "@/utils/getData";

export const removeNotificationFromDB = async (id: number) => {
  const response = await getData<number, { notificacionID: number }>(
    "eliminarNotificacion",
    "DELETE",
    undefined,
    id,
  );

  if ("error" in response) return response;
  else return response.notificacionID;
};
