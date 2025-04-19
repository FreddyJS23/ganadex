"use client";

import { Input } from "@/components/Inputs";
import { LayoutModal } from "..";
import type { ResponseCausaFallecimiento, ResponseErrorNext } from "@/types";
import type { CreateCausaFallecimiento } from "@/types/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useDisclosure } from "@nextui-org/react";
import { createCausaFallecimientoShema } from "@/validations/causaFallecimiento";
import {
  createCausaFallecimiento,
  updateCausaFallecimiento,
} from "@/actions/causaFallecimiento";

type ModalCreateCausaFallecimientoProps = {
  create: boolean;
  referer?: string | null;
};
type ModalUpdateCausaFallecimientoProps = {
  id: number;
  causa: string;
  update: boolean;
};

type ModalCausaFallecimientoProps =
  | ModalCreateCausaFallecimientoProps
  | ModalUpdateCausaFallecimientoProps;

export const ModalCreateUpdateCausaFallecimiento = (
  props: ModalCausaFallecimientoProps,
) => {
  let update = false;
  let causaFallecimiento: string | undefined = undefined;
  let referer: string | null | undefined = undefined;

  /* comprobar la exitencia del update para evitar problema de tipado typescript */
  if ("update" in props) {
    update = true;
    causaFallecimiento = props.causa;
  }

  if ("referer" in props) {
    referer = props.referer;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCausaFallecimiento>({
    resolver: zodResolver(createCausaFallecimientoShema),
    defaultValues: { causa: causaFallecimiento },
  });

  const { onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const formRef = useRef(null);
  let response: ResponseCausaFallecimiento | ResponseErrorNext;
  let messageResponse: string;

  const actionCausaFallecimiento: () => void = handleSubmit(async (data) => {
    if ("create" in props) {
      response = await createCausaFallecimiento(data);
      if ("causa_fallecimiento" in response)
        messageResponse = `Causa de fallecimiento ${response.causa_fallecimiento} creada`;
    } else if ("update" in props) {
      response = await updateCausaFallecimiento(data, props.id);
      messageResponse = "Causa de fallecimiento actualizada";
    }

    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    toast.success(messageResponse);

    /* ya que esta ruta puede ser usada por intercesión de ruta o una ruta normal la navegación sera diferente.
    Los datos registrados deben estar lo mas reciente posible, por lo que
    se hace una navegación para refrescar dependiendo del path donde se llame */

    //rutas dentro de su modulo (/revisiones/tipo)
    if (!referer) {
      router.refresh();
      return router.push(`/fallecimientos`);
    }
    const pathOrigin = referer.split("/");
    //eliminar parte del dominio, ejemplo de referer: http://localhost:3000/fallecimeintos/registrar/35
    const segmentPath = pathOrigin.slice(3);
    const lastSegment = parseInt(segmentPath[segmentPath.length - 1]);
    //reconstruir ruta que hizo referencia
    const newRoute = segmentPath.join("/");
    //si es un numero es porque se esta creando fuera de su modulo (fallecimientos/causa/crear)
    if (typeof lastSegment == "number") {
      return router.replace(`/${newRoute}`);
    }

    router.refresh();
    return router.push(`/fallecimientos`);
  });

  return (
    <LayoutModal
      icon="dead"
      titleModal={
        update
          ? "Actualizar causa de fallecimiento"
          : "Crear causa de fallecimiento"
      }
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        id={
          update
            ? "form-updateCausaFallecimiento"
            : "form-createCausaFallecimiento"
        }
        ref={formRef}
        action={actionCausaFallecimiento}
        method="post"
        className="m-auto flex flex-col gap-4 w-2/4 "
      >
        <Input
          id="causa"
          label="Causa fallecimiento"
          required
          type="text"
          size="lg"
          register={register}
          errors={errors}
          defaultValue={causaFallecimiento}
        />
      </form>
    </LayoutModal>
  );
};
