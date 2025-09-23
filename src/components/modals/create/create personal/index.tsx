"use client";

import { LayoutModal } from "../..";
import { Controller } from "react-hook-form";
import { createStaff } from "@/actions/personal";
import { formStaff } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/selects/select";
import type { ResponseCargosPersonal } from "@/types";
import type { CreateStaff } from "@/types/forms";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";
import { useDisclosure } from "@nextui-org/react";
import { createStaffShema } from "@/validations/staffShema";
import { useFormManager } from "@/hooks/useFormManager";

type ModalCreatePersonal = {
  cargos_personal: ResponseCargosPersonal["cargos_personal"];
};

export const ModalCreatePersonal = ({
  cargos_personal,
}: ModalCreatePersonal) => {
  const { onOpen, onOpenChange } = useDisclosure();

  const { handleSubmitForm, errors, register, formRef, control } =
    useFormManager<CreateStaff, string | undefined>({
      schema: createStaffShema,
      typeForm: "create",
      submitCreateAction: createStaff,
      messageOnSuccess: "creadoExitosamente",
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
        action={handleSubmitForm}
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
                  description={
                    id == "telefono" ? "Formato xxxx-xxxxxxx" : undefined
                  }
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
