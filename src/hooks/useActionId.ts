import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ResponseErrorNext } from "@/types";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { messagesSuccesModal } from "@/collections/messagesSuccesModal";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseActionIdProps<ResponseAction> = {
  /**Manejo personalizado al completar exitosamente la acción*/
  customSuccessAction?: () => void;
  /**Si esta en un modal, se usa para hacer un redirect al router*/
  onClose?: () => void;
  /** Mensaje que se muestra en el toast al completar exitosamente la acción */
  messageOnSuccess: keyof typeof messagesSuccesModal;
  /**  Función que se encarga de disparar la acción */
  action: (id: number) => Promise<ResponseAction | ResponseErrorNext>;
  /** Id de la entidad  que se le realizara la acción */
  id: number;
  /**  Indica si solo se debe mostrar el mensaje de éxito sin el mensaje del backend
   * @default false
   */
  justMessageOnSuccess?: boolean;
  /** Indica si el router se debe refrescar o no
   * @default true
   */
  /** Indica si la data de la respuesta debe ir al fina del mensaje
   * @default false
   */
  messageResponseLast?: boolean;
  routerRefresh?: boolean;
  /** Indica si el router se debe volver a la ruta anterior o no
   * @default true
   */
  routerBack?: boolean;
};

export const useActionId = <ResponseAction>(
  props: UseActionIdProps<ResponseAction>,
) => {
  const {
    onClose,
    customSuccessAction,
    action,
    id,
    messageOnSuccess,
    routerRefresh = true,
    routerBack = true,
    justMessageOnSuccess = false,
    messageResponseLast = false,
  } = props;

  const { activateLoading, disableLoading } = useLoadingButtonModal();
  const router = useRouter();

  const onAction = async () => {
    activateLoading();

    const response = await action(id);
    /* manejar error del backend y mostrar mensaje */

    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response!) {
      disableLoading();
      return toast.error(messageErrorApi(response));
    }
    disableLoading();

    //mostrar mensaje de éxito
    if (justMessageOnSuccess) {
      handleSuccess(`${messagesSuccesModal[messageOnSuccess]}`);
    }
    //mensajes con respuesta del servidor
    else {
      //mensaje de éxito con respuesta del servidor al final del texto
      if (messageResponseLast)
        return handleSuccess(
          `${messagesSuccesModal[messageOnSuccess]} ${response} `,
        );
      //mensaje de éxito con respuesta del servidor al principio del texto
      else
        return handleSuccess(
          `${response} ${messagesSuccesModal[messageOnSuccess]}`,
        );
    }

    justMessageOnSuccess
      ? handleSuccess(`${messagesSuccesModal[messageOnSuccess]}`)
      : handleSuccess(`${response} ${messagesSuccesModal[messageOnSuccess]}`);
    customSuccessAction && customSuccessAction();
    return response;
  };

  const handleSuccess = (onSucces: string) => {
    toast.success(onSucces);
    onClose && onClose();
    if (routerRefresh && routerBack) {
      router.refresh();
      return router.back();
    } else if (routerRefresh) return router.refresh();
    else if (routerBack) return router.back();
  };

  return {
    /** Enviar acción  */
    onAction,
  };
};
