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
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { useFormManager } from "@/hooks/useFormManager";

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
  const { id: cattleId } = useParams<{ id: string }>();

  const router = useRouter();

  const customSuccessAction = () => {
    /* no se usa el refresh ya que esta sección se ejecuta en una intercesión de ruta,
  por ende el refresh bloquea la navegación */
    router.push(`/ganado/${cattleId}/pesajes_leche`);
    onClose && onClose();
  };

  const { handleSubmitForm, errors, register, formRef } = useFormManager<
    UpdateWeightMilk,
    string
  >({
    schema: updateWeightMilkShema,
    typeForm: "edit",
    id: pesajeLeche.id,
    id_related: Number.parseInt(cattleId),
    submitEditWithIdAction: updateWeightMilk,
    defaultValues: pesajeLeche,
    messageOnSuccess: "actualiacion",
    routerBack: false,
    routerRefresh: false,
    customSuccessAction: customSuccessAction,
    justMessageOnSuccess: true,
  });

  return (
    <LayoutModal
      icon="milk"
      titleModal={"Actualizar pesaje de leche "}
      footer={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      refForm={formRef}
    >
      <form
        id="form-updateWeightMilk"
        ref={formRef}
        action={handleSubmitForm}
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
