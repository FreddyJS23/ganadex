import { ResponseNotificaciones } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export async function GET() {
  const response = await getData<ResponseNotificaciones>({
    endPoint: "notificaciones",
  });

  const { notificaciones } = responseErrorServer(response);

  return Response.json(notificaciones);
}
