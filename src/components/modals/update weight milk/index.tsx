"use client";

import { LayoutModal } from "..";
import {
  type LayoutModalProps,
  type PesajeLecheGanado,
  PositionStaff,
} from "@/types";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useForm } from "react-hook-form";
import type { UpdateWeightMilk } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { formWeightMilk } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { updateWeightMilkShema } from "@/validations/WeightMilkShema";
import { updateWeightMilk } from "@/actions/weightMilk";

type ModalUpdateWeightMilkProps = Pick<
  LayoutModalProps,
  "isOpen" | "onOpenChange" | "onClose"
> & {
  pesajeLeche: PesajeLecheGanado;
};

export const ModalUpdateWeightMilk = ({
  isOpen,
  onOpenChange,
  onClose,
  pesajeLeche,
}: ModalUpdateWeightMilkProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateWeightMilk>({
    resolver: zodResolver(updateWeightMilkShema),
    defaultValues: pesajeLeche,
  });

  const form = useRef<HTMLFormElement | null>(null);

  const { id: cattleId } = useParams<{ id: string }>();

  const router = useRouter();

  const actionWeightMilk: () => void = handleSubmit(async (data) => {
    const response = await updateWeightMilk(
      pesajeLeche.id,
      Number.parseInt(cattleId),
      data,
    );

    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    form.current?.reset();

    toast.success("Se ha actualizado correctamente");
    /* no se usa el refresh ya que esta sección se ejecuta en una intercesión de ruta,
    por ende el refresh bloquea la navegación */
    router.push(`/ganado/${cattleId}/pesajes_leche`);
    onClose && onClose();
  });

  return (
    <LayoutModal
      icon="milk"
      titleModal={"Actualizar pesaje de leche "}
      footer={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClick={actionWeightMilk}
      onClose={onClose}
      refForm={form}
    >
      <form
        ref={form}
        action={actionWeightMilk}
        className="flex flex-col items-center m-auto max-w-[827px]"
      >
        <div className="flex flex-col  gap-6 flex-wrap justify-around md:gap-12 sm:flex-row ">
          {formWeightMilk.map(({ id, label, required, type, endContent }) => (
            <div key={id} className="sm:w-44">
              {
                <Input
                  key={id}
                  id={id}
                  label={label}
                  required={required}
                  type={type}
                  endContent={endContent}
                  register={register}
                  errors={errors}
                  defaultValue={
                    id == "peso_leche" ? pesajeLeche.pesaje : pesajeLeche.fecha
                  }
                />
              }
            </div>
          ))}
        </div>
      </form>
    </LayoutModal>
  );
};
