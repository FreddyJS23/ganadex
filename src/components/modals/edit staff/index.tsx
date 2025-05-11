"use client";

import { LayoutModal } from "..";
import type { LayoutModalProps, Personal, PositionStaff } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { Controller, useForm } from "react-hook-form";
import type { CreateStaff } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStaffShema } from "@/validations/staffShema";
import { editStaff } from "@/actions/personal";
import { useMemo, useRef } from "react";
import { formStaff } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/select";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { useFormManager } from "@/hooks/useFormManager";

type ModalEditStaffProps = Pick<
  LayoutModalProps,
  "isOpen" | "onOpenChange" | "onClose"
> & {
  personal: Personal;
  cargos_personal: PositionStaff[];
};

export const ModalEditStaff = ({
  isOpen,
  onOpenChange,
  onClose,
  personal,
  cargos_personal,
}: ModalEditStaffProps) => {
  const getIdCargo = useMemo(() => {
    const cargo = cargos_personal.find(({ cargo }) => cargo == personal.cargo);
    return cargo?.id.toString();
  }, [cargos_personal, personal]);


  const defaultValues = { ...personal, cargo_id: getIdCargo };

  const { handleSubmitForm, errors, register, formRef, control } =
    useFormManager<CreateStaff, Personal>({
      schema: createStaffShema,
      typeForm: "edit",
      id: personal.id,
      submitEditAction: editStaff,
      defaultValues: defaultValues,
      messageOnSuccess: "actualiacion",
      justMessageOnSuccess: true,
      onClose: onClose,
      routerBack: false,
    });


  return (
    <LayoutModal
      icon="customer"
      titleModal={"Actualizar "}
      dataHeader={`${personal.cargo}`}
      footer={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      refForm={formRef}
    >
      <form
        id="form-editStaff"
        ref={formRef}
        action={handleSubmitForm}
        className="flex flex-col items-center m-auto max-w-[827px]"
      >
        <div className="flex flex-col  gap-6 flex-wrap justify-around md:gap-12 sm:flex-row ">
          {formStaff.map(({ id, label, required, type, endContent }) => (
            <div key={id} className="sm:w-44">
              {type != "select" && id != "cargo_id" && (
                <Input
                  key={id}
                  id={id}
                  label={label}
                  required={required}
                  type={type}
                  endContent={endContent}
                  register={register}
                  errors={errors}
                  defaultValue={personal[id]}
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
                      value={getIdCargo}
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
