import { Input } from "@/components/Inputs";
import { LayoutModal } from "@/components/modals";

import type { ModalProps } from "@/types";
import { createPriceMilk } from "@/actions/precioLeche";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type { CreatePriceMilk } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPriceMilkShema } from "@/validations/priceMilkShema";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";

export const ModalNewPriceMilk = ({
  isOpen,
  onOpen,
  onOpenChange,
  dataHeader,
}: ModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePriceMilk>({
    resolver: zodResolver(createPriceMilkShema),
  });

  const router = useRouter();
  const formRef = useRef(null);

  const actionCreatePriceMilk: () => void = handleSubmit(async (data) => {
    const priceMilk = await createPriceMilk(data);
    /* manejar error del backend y mostrar mensaje */
    if (typeof priceMilk == "object" && "error" in priceMilk)
      return toast.error(messageErrorApi(priceMilk));

    toast.success(`Se ha creado el nuevo precio actual ${priceMilk}$ de leche`);
    router.back();
    router.refresh();
  });

  return (
    <LayoutModal
      icon="price"
      titleModal={"Crear nuevo precio para la leche"}
      dataHeader={dataHeader}
      footer={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        action={actionCreatePriceMilk}
        id="form-createPriceMilk"
        ref={formRef}
        className="m-auto w-2/4 "
      >
        <Input
          id="precio"
          label="Precio"
          required
          type="number"
          endContent="dolar"
          size="lg"
          register={register}
          errors={errors}
        />
      </form>
    </LayoutModal>
  );
};
