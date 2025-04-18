import React, { useRef } from "react";
import { LayoutModal } from "..";
import { toast } from "sonner";
import { updateConfiguration } from "@/actions/usuario";
import { Input } from "@/components/Inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateConfiguration } from "@/types/forms";
import type { Configuracion, ModalProps } from "@/types";
import { useRouter } from "next/navigation";
import { updateConfigurationShema } from "@/validations/updateConfiguration";
import { useSession } from "next-auth/react";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";

export const ModalUpdateConfiguracion = ({
  isOpen,
  onOpen,
  onOpenChange,
}: ModalProps) => {
  const { update, data: session } = useSession();
  const configuracion = session?.user.configuracion as Configuracion;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateConfiguration>({
    resolver: zodResolver(updateConfigurationShema),
    defaultValues: { ...configuracion },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const actionsUpdateConfiguration: () => void = handleSubmit(async (data) => {
    const response = await updateConfiguration(data);
    /* manejar error del backend y mostrar mensaje */
    if ("error" in response) return toast.error(messageErrorApi(response));

    toast.success("Configuración actualizada");
    await update({
      ...session,
      user: { ...session?.user, configuracion: response },
    });

    formRef.current?.reset();
    router.refresh();
    router.back();
  });

  return (
    <LayoutModal
      icon="customer"
      titleModal={"Actualizar configuración"}
      footer={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        className="flex flex-col gap-4 bg-base-100 pb-4 px-8 sm:p-2 sm:items-center"
        action={actionsUpdateConfiguration}
        ref={formRef}
        id="form-updateConfiguration"
      >
        <div className="sm:max-w-64 sm:w-60">
          <Input
            id="peso_servicio"
            required
            type="number"
            label="Peso de servicio"
            register={register}
            errors={errors}
            defaultValue={configuracion.peso_servicio.toString()}
          />
        </div>

        <div className="sm:max-w-64 sm:w-60">
          <Input
            id="dias_evento_notificacion"
            required
            type="number"
            label="Dias de evento notificación"
            register={register}
            errors={errors}
            defaultValue={configuracion.dias_evento_notificacion.toString()}
          />
        </div>

        <div className="sm:max-w-64 sm:w-60">
          <Input
            id="dias_diferencia_vacuna"
            required
            type="number"
            label="Dias de diferencia vacuna"
            register={register}
            errors={errors}
            defaultValue={configuracion.dias_diferencia_vacuna.toString()}
          />
        </div>
      </form>
    </LayoutModal>
  );
};
