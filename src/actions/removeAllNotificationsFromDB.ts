"use server";

import { ResponseErrorNext } from "@/types";
import { getData } from "@/utils/getData";

export const removeAllNotificationsFromDB = async (): Promise<
  200 | ResponseErrorNext
> => {
  const response = await getData<void, boolean>(
    "eliminarTodasNotificaciiones",
    "GET",
  );

  if (typeof response == "object" && "error" in response) return response;
  else return 200;
};
