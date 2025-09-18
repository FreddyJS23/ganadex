"use server";

import { ResponseErrorNext } from "@/types";
import { getData,  } from "@/services/apiClient";

export const removeAllNotificationsFromDB = async (): Promise<
  200 | ResponseErrorNext
> => {
  const response = await getData<boolean>(
   {endPoint:"eliminarTodasNotificaciiones",}
    
  );

  if (typeof response == "object" && "error" in response) return response;
  else return 200;
};
