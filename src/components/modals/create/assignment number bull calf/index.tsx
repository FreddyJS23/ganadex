"use client";

import { Input } from "@/components/Inputs";
import { LayoutModal } from "@/components/modals";

import type { ModalProps } from "@/types";
import { useDisclosure } from "@nextui-org/react";
import type { CreateAssigmentNumberBullCalf } from "@/types/forms";
import { assignmentNumberBullCalf } from "@/actions/assigmentNumberBullCalf";
import { assignmentNumberBullCalfShema } from "@/validations/assignmentNumberBullCalfShema";
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
