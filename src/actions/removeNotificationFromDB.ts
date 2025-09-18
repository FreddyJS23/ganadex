"use server";

import { submitForm } from "@/services/apiClient";

export const removeNotificationFromDB = async (id: number) => {
  const response = await submitForm<number, { notificacionID: number }>(
    "eliminarNotificacion",
    "DELETE",
    undefined,
    id,
  );

  if ("error" in response) return response;
  else return response.notificacionID;
};
