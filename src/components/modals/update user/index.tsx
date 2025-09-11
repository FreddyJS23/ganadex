import React, { useRef } from "react";
import { LayoutModal } from "..";
import { toast } from "sonner";
import { updateUser } from "@/actions/usuario";
import { Input } from "@/components/Inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateUser } from "@/types/forms";
import { updateUserShema } from "@/validations/updateUse";
import type { ModalProps, UserAdminInfo, UserVeterinaryInfo } from "@/types";
import { useRouter } from "next/navigation";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { useFormManager } from "@/hooks/useFormManager";

type ModalUpdateUserProps = {
  id: number;
  usuario: UserVeterinaryInfo | UserAdminInfo;
  onClose: () => void;
};

export const ModalUpdateUser = ({
  id,
  usuario,
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
}: ModalProps & ModalUpdateUserProps) => {
  const { handleSubmitForm, errors, register, formRef } = useFormManager<
    UpdateUser,
    string
  >({
    schema: updateUserShema,
    typeForm: "edit",
    id: id,
    submitEditAction: updateUser,
    defaultValues: { usuario: usuario.usuario },
    messageOnSuccess: "usuarioActualizado",
    routerBack: false,
    onClose: onClose,
  });

  return (
    <LayoutModal
      icon="customer"
      titleModal={"Actualizar usuario"}
      footer={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
      onClose={onClose}
    >
      <form
        className="flex flex-col gap-4 bg-base-100 pb-4 px-8 sm:p-2 sm:items-center"
        action={handleSubmitForm}
        ref={formRef}
        id="form-updateUser"
      >
        <div className="sm:max-w-64 sm:w-60">
          <Input
            id="usuario"
            required
            type="text"
            label="Nuevo usuario"
            register={register}
            errors={errors}
            defaultValue={usuario.usuario}
          />
        </div>

        <div className="sm:max-w-64 sm:w-60">
          <Input
            id="password"
            required
            type="password"
            label="Nueva contraseña"
            register={register}
            errors={errors}
          />
        </div>

        <div className="sm:max-w-64 sm:w-60">
          <Input
            id="password2"
            required
            type="password"
            label="Repita la Contraseña"
            register={register}
            errors={errors}
          />
        </div>
      </form>
    </LayoutModal>
  );
};
