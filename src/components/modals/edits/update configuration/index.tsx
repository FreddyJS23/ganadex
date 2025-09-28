import { LayoutModal } from "@/components/modals";

import { updateConfiguration } from "@/actions/usuario";
import { Input } from "@/components/Inputs";
import type { UpdateConfiguration } from "@/types/forms";
import type { Configuracion, ModalProps } from "@/types";
import { useRouter } from "next/navigation";
import { updateConfigurationShema } from "@/validations/updateConfiguration";
import { useSession } from "next-auth/react";
import { useFormManager } from "@/hooks/useFormManager";

export const ModalUpdateConfiguracion = ({
  isOpen,
  onOpen,
  onOpenChange,
}: ModalProps) => {
  const { update, data: session } = useSession();
  const configuracion = session?.user.configuracion as Configuracion;

  const router = useRouter();

  const handleSucces = async (data: Configuracion) => {
    await update({
      ...session,
      user: { ...session?.user, configuracion: data },
    });
    router.refresh();
    router.back();
  };

  const { handleSubmitForm, errors, register, formRef } = useFormManager<
    UpdateConfiguration,
    Configuracion
  >({
    schema: updateConfigurationShema,
    typeForm: "create",
    submitCreateAction: updateConfiguration,
    defaultValues: { ...configuracion },
    messageOnSuccess: "configuracionActualizada",
    justMessageOnSuccess: true,
    customSuccessAction: handleSucces,
    routerBack: false,
    routerRefresh: false,
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
        action={handleSubmitForm}
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
            label="Días de evento notificación"
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
            label="Días de diferencia vacuna"
            register={register}
            errors={errors}
            defaultValue={configuracion.dias_diferencia_vacuna.toString()}
          />
        </div>
      </form>
    </LayoutModal>
  );
};
