"use client";

import { useDisclosure } from "@nextui-org/react";
import { LayoutModal } from "..";
import type { ModalProps, Servicio } from "@/types";
import { ButtonsEditedDelete } from "@/ui/Buttons edit-delete";
import { useEditDelete } from "@/lib/hooks/useEditDelete";
import { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateServe } from "@/types/forms";
import { updateServeShema } from "@/validations/serveShema";
import { editServe } from "@/actions/servicio";
import { toast } from "sonner";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { Input } from "@/components/Inputs";

export const ModalServe = ({
  servicio,
}: ModalProps & { servicio: Servicio }) => {
  const { onOpen, onOpenChange } = useDisclosure();

  const {
    stateButton,
    onEdit,
    onDelete,
    isLoading,
    setIsLoading,
    onSaveOrCancel,
  } = useEditDelete();

  return (
    <LayoutModal
      icon="serve"
      titleModal={"Servicio del "}
      footer={false}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      dataHeader={typeof servicio.fecha == "string" ? servicio.fecha : ""}
    >
      <>
        {/* botón flotante */}
        {
          <div className="absolute left-[19%] top-[7%]">
            <ButtonsEditedDelete
              id={servicio.id}
              size="md"
              hiddenDelete
              formId="form-edit-servicio"
              onEdit={onEdit}
              state={stateButton}
              onCancel={onSaveOrCancel}
              isLoading={isLoading}
              onDelete={onDelete}
            />
          </div>
        }

        {stateButton == "save" ? (
          <ServicioEdit
            setIsLoading={setIsLoading}
            servicio={servicio}
            onSaveOrCancel={onSaveOrCancel}
          />
        ) : (
          <div className="flex flex-col gap-4 mb-4">
            <p>
              <b>Observación: </b> {servicio.observacion}
            </p>
            {servicio.toro ? (
              <p>
                <b>Toro: </b> {servicio.toro.numero}
              </p>
            ) : (
              <p>
                <b>Pajuela toro: </b> {servicio.pajuela_toro?.codigo}
              </p>
            )}
            <p>
              <b>Tipo: </b> {servicio.tipo}
            </p>
            <p>
              <b>Veterinario que hizo el servicio: </b>{" "}
              {servicio.veterinario.nombre}
            </p>
          </div>
        )}
      </>
    </LayoutModal>
  );
};

type ServicioProps = {
  servicio: Servicio;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveOrCancel: () => void;
};
const ServicioEdit = ({
  servicio,
  setIsLoading,
  onSaveOrCancel,
}: ServicioProps) => {
  const form = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const { id: cattleId } = useParams<{ id: string }>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateServe>({
    resolver: zodResolver(updateServeShema),
    defaultValues: {
      fecha: servicio.fecha,
      observacion: servicio.observacion,
    },
  });

  const actionEditServe: () => void = handleSubmit(async (data) => {
    setIsLoading(true);
    const response = await editServe(
      servicio.id,
      Number.parseInt(cattleId),
      data,
    );
    //manejar error del backend y mostrar mensaje
    if (typeof response == "object" && "error" in response) {
      setIsLoading(false);
      return toast.error(messageErrorApi(response));
    }
    setIsLoading(false);
    onSaveOrCancel();
    toast.success(`Servicio Actualizada`);
    /* no se usa el refresh porque al hacerlo se bugea la navegacion */
    router.push(`/ganado/${cattleId}/servicio`);
  });

  return (
    <form
      id="form-edit-servicio"
      ref={form}
      action={actionEditServe}
      className="flex flex-col pb-6 ps-5 items-center m-auto max-w-[827px]"
    >
      <div className="flex flex-col gap-6 flex-wrap justify-around md:gap-4 sm:flex-row ">
        <Input
          id="fecha"
          label="Fecha"
          type="date"
          register={register}
          errors={errors}
          required={true}
          defaultValue={servicio.fecha}
        />

        <Input
          id="observacion"
          label="Observación"
          type="text"
          register={register}
          errors={errors}
          required={true}
          defaultValue={servicio.observacion}
        />
      </div>
    </form>
  );
};
