import { ResponseNotificaciones } from "@/types";
import { getData } from "@/utils/getData";

export async function GET() {
    const { notificaciones }: ResponseNotificaciones =
    await getData('notificaciones');
    return Response.json(notificaciones);
}