import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema } from "zod";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ResponseErrorNext } from "@/types";
import { useRef } from "react";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { messagesSuccesModal } from "@/collections/messagesSuccesModal";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseFormManagerBaseProps<T, ResponseAction> = {
  /**Esquema de validación de los datos*/
  schema: ZodSchema<T>;
  /**Valores por defecto*/
  defaultValues?: DefaultValues<T>;
  /**Manejo personalizado al completar exitosamente la acción
   * @param data Datos de la respuesta del servidor
   */
  customSuccessAction?: (data: ResponseAction) => void;
  /**Si esta en un modal, se usa para hacer un redirect al router*/
  onClose?: () => void;
  /** Mensaje que se muestra en el toast al completar exitosamente la acción */
  messageOnSuccess: keyof typeof messagesSuccesModal | (() => string);
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

type UseFormCreateManager<T, ResponseAction> = UseFormManagerBaseProps<
  T,
  ResponseAction
> & {
  /**Tipo de formulario para cargar un acción de creación o actualización   */
  typeForm: "create";
  /**  Función que se encarga de enviar los datos a la action de crear */
  submitCreateAction?: (
    formData: T,
  ) => Promise<ResponseAction | ResponseErrorNext>;
  /** Función que se encarga de enviar los datos a la action y necesita el id de la entidad */
  submitCreateWithIdAction?: (
    formData: T,
    id: number,
  ) => Promise<ResponseAction | ResponseErrorNext>;
  /** Función que se encarga de enviar los datos a la action y necesita el id de la entidad */
  submitJustIdAction?: (
    id: number,
  ) => Promise<ResponseAction | ResponseErrorNext>;
  id?: number;
};

type UseFormEditeManager<T, ResponseAction> = UseFormManagerBaseProps<
  T,
  ResponseAction
> & {
  typeForm: "edit";
  id: number;
  id_related?: number;
  /** Función que se encarga de enviar los datos a la action editar*/
  submitEditAction?: (
    id: number,
    data: T,
  ) => Promise<ResponseAction | ResponseErrorNext>;
  /* Función que se encarga de enviar los datos a la action editar con un dos id, 
  uno para el item a editar y el otro para el item relacionado*/
  submitEditWithIdAction?: (
    id: number,
    id_related: number,
    data: T,
  ) => Promise<ResponseAction | ResponseErrorNext>;
};

export type UseFormManagerProps<T, ResponseAction> =
  | UseFormCreateManager<T, ResponseAction>
  | UseFormEditeManager<T, ResponseAction>;

export const useFormManager = <T extends FieldValues, ResponseAction>(
  props: UseFormManagerProps<T, ResponseAction>,
) => {
  const {
    typeForm,
    schema,
    defaultValues,
    onClose,
    customSuccessAction,
    messageOnSuccess,
    routerRefresh = true,
    routerBack = true,
    justMessageOnSuccess = false,
    messageResponseLast = false,
  } = props;

  const { activateLoading, disableLoading } = useLoadingButtonModal();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handleSubmitForm: () => void = handleSubmit(async (data) => {
    activateLoading();

    let response: ResponseAction | ResponseErrorNext | undefined;

    if (typeForm === "create") {
      if (props.submitCreateAction)
        response = await props.submitCreateAction(data);
      else if (props.submitCreateWithIdAction)
        response = await props.submitCreateWithIdAction(
          data,
          props.id as number,
        );
      else if (props.submitJustIdAction)
        response = await props.submitJustIdAction(props.id as number);
    } else if (typeForm === "edit") {
      if (props.submitEditAction)
        response = await props.submitEditAction(props.id, data);
      else if (props.submitEditWithIdAction)
        response = await props.submitEditWithIdAction(
          props.id,
          props.id_related as number,
          data,
        );
    }
    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response!) {
      disableLoading();
      return toast.error(messageErrorApi(response));
    }

    disableLoading();
    formRef.current?.reset();

    const message =
      typeof messageOnSuccess == "function"
        ? messageOnSuccess()
        : messagesSuccesModal[messageOnSuccess];
    if (response) {
      //mostrar mensaje de éxito
      if (justMessageOnSuccess) {
        return handleSuccess(`${message}`, response);
      }
      /* mensajes con respuesta del servidor */
      else if (!justMessageOnSuccess) {
        //mensaje de éxito con respuesta del servidor al final del texto
        if (messageResponseLast)
          return handleSuccess(`${message} ${response} `, response);
        //mensaje de éxito con respuesta del servidor al principio del texto
        else return handleSuccess(`${response} ${message}`, response);
      }
    }
  });

  const handleSuccess = (onSucces: string, data: ResponseAction) => {
    toast.success(onSucces);

    if (customSuccessAction) return customSuccessAction(data);

    onClose && onClose();
    if (routerRefresh && routerBack) {
      router.refresh();
      return router.back();
    } else if (routerRefresh) return router.refresh();
    else if (routerBack) return router.back();
  };

  return {
    /** Método react hook form para manejar el formulario */
    register,
    /** Método react hook form para manejar errores del formulario */
    errors,
    /** Enviar formulario  */
    handleSubmitForm,
    /** Método react hook form para cambiar valores   */
    setValue,
    /** Método react hook form para manejar componentes formulario de otras bibliotecas de UI   */
    control,
    /** Referencia del formulario   */
    formRef,
  };
};
