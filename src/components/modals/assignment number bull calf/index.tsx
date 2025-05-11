"use client";

import { Input } from "@/components/Inputs";
import { LayoutModal } from "..";
import type { ModalProps } from "@/types";
import { useDisclosure } from "@nextui-org/react";
import type { CreateAssigmentNumberBullCalf } from "@/types/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignmentNumberBullCalf } from "@/actions/assigmentNumberBullCalf";
import { toast } from "sonner";
import { assignmentNumberBullCalfShema } from "@/validations/assignmentNumberBullCalfShema";
import { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { useFormManager } from "@/hooks/useFormManager";

export const ModalAssignmentNumberBullCalf = ({
  dataHeader,
}: Pick<ModalProps, "dataHeader">) => {
  const { onOpen, onOpenChange } = useDisclosure();

  const { handleSubmitForm, errors, register, formRef } = useFormManager<
    CreateAssigmentNumberBullCalf,
    void | undefined
  >({
    schema: assignmentNumberBullCalfShema,
    typeForm: "create",
    submitCreateWithIdAction: assignmentNumberBullCalf,
    messageOnSuccess: "exito",
  });

  return (
    <LayoutModal
      icon="bullCalf"
      titleModal={"Asignación de numero al becerro "}
      dataHeader={`${dataHeader} ?`}
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        ref={formRef}
        id="form-assignmentNumber"
        action={handleSubmitForm}
        className="m-auto w-2/4 "
      >
        <Input
          id="numero"
          label="Numero"
          required
          type="number"
          size="lg"
          register={register}
          errors={errors}
        />
      </form>
    </LayoutModal>
  );
};
