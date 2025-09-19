"use server";

import { submitForm } from "@/services/apiClient";

export const removeNotificationFromDB = async (id: number) => {
  const response = await submitForm<number, { notificacionID: number }>(
  {  endPoint:"eliminarNotificacion",
    method:"DELETE",
    id,}
  );

  if ("error" in response) return response;
  else return response.notificacionID;
};
