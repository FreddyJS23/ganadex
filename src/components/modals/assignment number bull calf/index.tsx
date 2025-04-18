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

export const ModalAssignmentNumberBullCalf = ({
  dataHeader,
}: Pick<ModalProps, "dataHeader">) => {
  const { onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateAssigmentNumberBullCalf>({
    resolver: zodResolver(assignmentNumberBullCalfShema),
  });

  const router = useRouter();
  const formRef = useRef(null);
  const params = useParams<{ id: string }>();

  const actionAssigmentNumberBullCalf: () => void = handleSubmit(
    async (data) => {
      const response = await assignmentNumberBullCalf(
        data,
        Number.parseInt(params.id),
      );
      /*ver si es tipo objecto para evitar conflictos de tipo para manejar error del backend y mostrar mensaje */
      if (typeof response == "object" && "error" in response)
        return toast.error(messageErrorApi(response));

      toast.success("Operación exitosa");
      router.back();
      router.refresh();
    },
  );

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
        action={actionAssigmentNumberBullCalf}
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
