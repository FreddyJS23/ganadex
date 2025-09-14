"use client";

import { LayoutModal } from "..";
import { Hacienda } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  Selection,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { createSesionHacienda as createSesionHaciendaAction } from "@/actions/hacienda";
import { getSession, useSession } from "next-auth/react";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";

export const ModalSelectHaciendaSesion = ({
  haciendas,
}: {
  haciendas: Hacienda[];
}) => {
  const { handleSubmit, control } = useForm<{ hacienda_id: number }>();
  const router = useRouter();
  const { update, data: session } = useSession();
  const formRef = useRef(null);
  const { onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = useState<Selection>(new Set([]));
  const { activateLoading, disableLoading } = useLoadingButtonModal();

  useEffect(() => {
    /* Llamar a la sesion para que el status el hook useSession se actualice y pase a authenticated,
        si no se hace esto el state queda en unauthenticated y no se actualiza, no permitiendo que se llame
        la funcion update para actualizar la sesion */
    const fetchSession = async () => await getSession();

    fetchSession();
  }, []);

  const createSesionHacienda: () => void = handleSubmit(async (data) => {
    activateLoading();
    if (!data.hacienda_id) {
      disableLoading();
      return toast.error("Debe seleccionar una hacienda");
    }
    try {
      const res = await createSesionHaciendaAction(data.hacienda_id);

      const hacienda = res as Hacienda;

      //actualizar sesion ya que hay una hacienda en sesion
      await update({
        ...session,
        user: { ...session?.user, sesion_hacienda: true, hacienda: hacienda },
      });

      toast.success(`Empezando a Trabajar en ${hacienda.nombre}`);
      /*verificar la sesión en el servidor para redireccionar  */
      router.push("/api/verificar_sesion_hacienda");
    } catch (error) {
      toast.error(error as string);
    } finally {
      disableLoading();
    }
  });

  //descripción de cuando se cierra la sesión y se redirige a signOut
  const onClose = () => {
    router.push("/api/signOut");
  };

  return (
    <LayoutModal
      icon="price"
      titleModal={"Selecionar hacienda en la que trabajar"}
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
      onClose={onClose}
      isDismissable={false}
    >
      <form
        id="form-select-hacienda"
        className="m-auto"
        ref={formRef}
        action={createSesionHacienda}
      >
        <Controller
          name={"hacienda_id"}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              id="hacienda_id"
              className="w-60"
              variant="underlined"
              label="Haciendas"
              required
              color="primary"
              selectedKeys={value}
              description="Haciendas registradas por el usuario"
              onSelectionChange={(keys) => {
                setValue(keys);
              }}
              classNames={{
                label: "text-current font-bold",
                value: "text-current",
                popoverContent: "bg-base-100",
              }}
            >
              {haciendas.map(({ id, nombre }) => (
                <SelectItem key={id}>{nombre}</SelectItem>
              ))}
            </Select>
          )}
        />
      </form>
    </LayoutModal>
  );
};
