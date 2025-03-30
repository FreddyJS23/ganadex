import { Input } from "@/components/Inputs";
import { LayoutModal } from "..";
import { ModalProps } from "@/types";
import { useForm } from "react-hook-form";
import { CreateCustomer } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCustomerShema } from "@/validations/Customer";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import { createCustomer } from "@/actions/comprador";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";

export const ModalCreateCustomer = ({
  isOpen,

  onOpen,
  onOpenChange,
}: ModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCustomer>({
    resolver: zodResolver(createCustomerShema),
  });

  const router = useRouter();
  const formRef = useRef(null);

  const actionCreateCustomer: () => void = handleSubmit(async (data) => {
    const response = await createCustomer(data);

    /*ver si es tipo objecto para evitar conflictos de tipo para manejar error del backedn y mostar mensaje */
    if (typeof response == "object")
      if ("error" in response) return toast.error(messageErrorApi(response));

    toast.success(`${response} ha sido registrado como nuevo comprador`);
    router.back();
    router.refresh();
  });

  return (
    <LayoutModal
      icon="customer"
      titleModal={"Crear nuevo comprador"}
      footer={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        ref={formRef}
        action={actionCreateCustomer}
        id={"form-createCustomer"}
        className="m-auto w-2/4 "
      >
        <Input
          id="nombre"
          label="Comprador"
          required
          type="text"
          size="lg"
          errors={errors}
          register={register}
        />
      </form>
    </LayoutModal>
  );
};
