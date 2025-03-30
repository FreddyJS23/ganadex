"use client";

import { Input } from "@/components/Inputs";
import { LayoutModal } from "..";
import { ResponseErrorNext, ResponseTipoRevision } from "@/types";
import { CreateTypeCheck } from "@/types/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useDisclosure } from "@nextui-org/react";
import { createTypeCheck, updateTypeCheck } from "@/actions/tipoRevision";
import { createTypeCheckShema } from "@/validations/typeCheck";

type ModalCreateTypeCheckProps = {
  create: boolean;
};
type ModalEditTypeCheckProps = {
  id: number;
  typeCheck: string;
  update: boolean;
};

type ModalTypeCheckProps = ModalCreateTypeCheckProps | ModalEditTypeCheckProps;

export const ModalCreateUpdateTypeCheck = (props: ModalTypeCheckProps) => {
  let update = false;
  let typeCheck: string | undefined = undefined;

  /* comprobar la exitencia del update para evitar problema de tipado typescript */
  if ("update" in props) {
    update = true;
    typeCheck = props.typeCheck;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateTypeCheck>({
    resolver: zodResolver(createTypeCheckShema),
    defaultValues: { tipo: typeCheck },
  });

  const { onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const formRef = useRef(null);
  let response: ResponseTipoRevision | ResponseErrorNext;
  let messageResponse: string;

  const actionTypeCheck: () => void = handleSubmit(async (data) => {
    if ("create" in props) {
      response = await createTypeCheck(data);
      if ("tipo_revision" in response)
        messageResponse = `Tipo de revision ${response.tipo_revision.tipo} creada`;
    } else if ("update" in props) {
      response = await updateTypeCheck(data, props.id);
      messageResponse = "Tipo de revision actualizada";
    }

    /* manejar error del backedn y mostar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    toast.success(messageResponse);
    router.back();
    router.refresh();
  });

  return (
    <LayoutModal
      icon="checkUp"
      titleModal={
        update ? "Actualizar tipo de revision" : "Crear tipo de revision"
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
          label="Tipo de revision"
          required
          type="text"
          size="lg"
          register={register}
          errors={errors}
          defaultValue={typeCheck}
        />
      </form>
    </LayoutModal>
  );
};
