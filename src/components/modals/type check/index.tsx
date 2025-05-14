"use client";

import { Input } from "@/components/Inputs";
import { LayoutModal } from "..";
import type { ResponseErrorNext, ResponseTipoRevision } from "@/types";
import type { CreateTypeCheck } from "@/types/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import { toast } from "sonner";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useDisclosure } from "@nextui-org/react";
import { createTypeCheck, updateTypeCheck } from "@/actions/tipoRevision";
import { createTypeCheckShema } from "@/validations/typeCheck";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";

type ModalCreateTypeCheckProps = {
  create: boolean;
  /**Ruta de la pagina que llama a la modal */
  referer?: string | null;
};
type ModalEditTypeCheckProps = {
  id: number;
  typeCheck: string;
  codeCheck: string | undefined;
  update: boolean;
};

type ModalTypeCheckProps = ModalCreateTypeCheckProps | ModalEditTypeCheckProps;

export const ModalCreateUpdateTypeCheck = (props: ModalTypeCheckProps) => {
  let update = false;
  let typeCheck: string | undefined = undefined;
  let codeCheck: string | undefined = undefined;
  let referer: string | null | undefined = undefined;
  /* comprobar la existencia del update para evitar problema de tipado typescript */
  if ("update" in props) {
    update = true;
    typeCheck = props.typeCheck;
    codeCheck = props.codeCheck;
  }

  if ("referer" in props) {
    referer = props.referer;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateTypeCheck>({
    resolver: zodResolver(createTypeCheckShema),
    defaultValues: { tipo: typeCheck, codigo: codeCheck },
  });

  const { onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const formRef = useRef(null);
  let response: ResponseTipoRevision | ResponseErrorNext;
  let messageResponse: string;
  const { activateLoading, disableLoading } = useLoadingButtonModal();

  const actionTypeCheck: () => void = handleSubmit(async (data) => {
    activateLoading();
    if ("create" in props) {
      response = await createTypeCheck(data);
      if ("tipo_revision" in response)
        messageResponse = `Tipo de revision ${response.tipo_revision.tipo} creada`;
    } else if ("update" in props) {
      response = await updateTypeCheck(data, props.id);
      messageResponse = "Tipo de revision actualizada";
    }

    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response) {
      disableLoading();
      return toast.error(messageErrorApi(response));
    }

    toast.success(messageResponse);

    /* ya que esta ruta se usa en varios lugares aparte de su modulo (/revisiones/tipo).
    Los datos registrados deben estar lo mas reciente posible, por lo que
    se hace una navegación para refrescar dependiendo del path donde se llame */

    //rutas dentro de su modulo (/revisiones/tipo)
    if (!referer) {
      disableLoading();
      /* no se usa el refresh ya que esta sección se ejecuta en una intercesión de ruta,
      por ende el refresh bloquea la navegación */
      return router.push(`/revisiones/tipo`);
    }

    const pathOrigin = referer.split("/");
    //eliminar parte del dominio, ejemplo de referer: http://localhost:3000/ganado/109/revision/registrar
    const segmentPath = pathOrigin.slice(3);

    if (segmentPath[segmentPath.length - 1] == "registrar") {
      disableLoading();
      //aquí se usar el refresh y el back, ya que las rutas donde se llaman no son intersecciones de ruta
      router.back();
      return router.refresh();
    }

    disableLoading();
    return router.push(`/revisiones/tipo`);
  });
  return (
    <LayoutModal
      icon="checkUp"
      titleModal={
        update ? "Actualizar tipo de revisión" : "Crear tipo de revisión"
      }
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        id={update ? "form-updateTypeCheck" : "form-createTypeCheck"}
        ref={formRef}
        action={actionTypeCheck}
        method="post"
        className="m-auto flex flex-col gap-4 w-2/4 "
      >
        <Input
          id="tipo"
          label="Tipo de revisión"
          required
          type="text"
          size="lg"
          register={register}
          errors={errors}
          defaultValue={typeCheck}
        />
        <Input
          id="codigo"
          label="Código de revisión"
          required
          type="text"
          size="lg"
          description="El código sera guardado en mayúsculas"
          register={register}
          errors={errors}
          defaultValue={codeCheck}
        />
      </form>
    </LayoutModal>
  );
};
