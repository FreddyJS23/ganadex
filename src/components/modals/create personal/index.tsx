"use client";

import { LayoutModal } from "..";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { createStaff } from "@/actions/personal";
import { formStaff } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/select";
import type { ResponseCargosPersonal } from "@/types";
import type { CreateStaff } from "@/types/forms";
import { Button } from "@/ui/Button";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useDisclosure } from "@nextui-org/react";
import { createStaffShema } from "@/validations/staffShema";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useRouter } from "next/navigation";

type ModalCreatePersonal = {
  cargos_personal: ResponseCargosPersonal["cargos_personal"];
};

export const ModalCreatePersonal = ({
  cargos_personal,
}: ModalCreatePersonal) => {
  const { onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateStaff>({
    resolver: zodResolver(createStaffShema),
  });

  const actionStaff: () => void = handleSubmit(async (data) => {
    const response = await createStaff(data);

    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    formRef.current?.reset();
    router.refresh();
    router.back();

    toast.success(`${response.nombre} ha sido creado con éxito`);
  });

  return (
    <LayoutModal
      icon="customer"
      titleModal={"Crear personal"}
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        ref={formRef}
        action={actionStaff}
        className="flex flex-col items-center gap-6  m-auto max-w-[827px]"
        id="form-createPersonal"
      >
        <div className="flex flex-col gap-6 flex-wrap justify-around md:gap-12 sm:flex-row ">
          {formStaff.map(({ id, label, required, type, endContent }) => (
            <div key={id} className="sm:w-44">
              {type != "select" && (
                <Input
                  key={id}
                  id={id}
                  label={label}
                  required={required}
                  type={type}
                  endContent={endContent}
                  register={register}
                  errors={errors}
                />
              )}

              {/*  select normal */}
              {type == "select" && (
                <Controller
                  name={id}
                  control={control}
                  render={({ field }) => (
                    <Select
                      field={field}
                      id={id}
                      items={converToSelectOptions(cargos_personal as [])}
                      label={label}
                      errors={errors}
                      required={required}
                    />
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </form>
    </LayoutModal>
  );
};
