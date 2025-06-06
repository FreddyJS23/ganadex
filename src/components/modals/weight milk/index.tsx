"use client";

import { Input } from "@/components/Inputs";
import { LayoutModal } from "..";
import type { ModalProps } from "@/types";
import { useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import type { CreateWeightMilk } from "@/types/forms";
import { createWeightMilkShema } from "@/validations/WeightMilkShema";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWeightMilk } from "@/actions/weightMilk";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { getDateNow } from "@/utils/getDateNow";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { useFormManager } from "@/hooks/useFormManager";

export const ModalWeightMilk = ({
  dataHeader,
}: Pick<ModalProps, "dataHeader">) => {
  const { onOpen, onOpenChange } = useDisclosure();

  const params = useParams<{ id: string }>();

  const { handleSubmitForm, errors, register, formRef } = useFormManager<
    CreateWeightMilk,
    string
  >({
    schema: createWeightMilkShema,
    typeForm: "create",
    id: Number.parseInt(params.id),
    submitCreateWithIdAction: createWeightMilk,
    defaultValues: { fecha: getDateNow() },
    messageOnSuccess: "crearPesajeLeche",
    justMessageOnSuccess: true,
  });

  return (
    <LayoutModal
      icon="weight"
      titleModal={"Pesaje de leche este mes vaca "}
      dataHeader={dataHeader}
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        action={handleSubmitForm}
        id="form-weightMilkCattle"
        ref={formRef}
        className="m-auto w-2/4 "
      >
        <Input
          id="peso_leche"
          label="Pesaje"
          required
          type="number"
          endContent="weight-milk"
          size="lg"
          register={register}
          errors={errors}
        />
        <Input
          required
          id={"fecha"}
          label={"Fecha"}
          defaultValue={getDateNow()}
          type="date"
          size="lg"
          errors={errors}
          register={register}
        />
      </form>
    </LayoutModal>
  );
};
