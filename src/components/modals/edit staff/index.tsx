"use client";

import { LayoutModal } from "..";
import { LayoutModalProps, Personal, PositionStaff } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { Controller, useForm } from "react-hook-form";
import { CreateStaff } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStaffShema } from "@/validations/staffShema";
import { editStaff } from "@/actions/personal";
import { useMemo, useRef } from "react";
import { formStaff } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/select";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";

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
    const cargo= cargos_personal.find(({cargo})=> cargo== personal.cargo)
    return cargo?.id.toString();
 }, [cargos_personal, personal]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateStaff>({
    resolver: zodResolver(createStaffShema),
    defaultValues:{...personal, cargo_id:getIdCargo}
  });

  const form = useRef<HTMLFormElement | null>(null);

  
 
  const router = useRouter();

  const actionStaff: () => void = handleSubmit(async (data) => {
    const response = await editStaff(personal.id,data);

    /* manejar error del backedn y mostar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    form.current?.reset();

    toast.success('Se ha actualizado correctamente');
     router.refresh();
     onClose && onClose();
  });

  return (
    <LayoutModal
      icon="customer"
      titleModal={"Actualizar "}
      dataHeader={`${personal.cargo}`}
      footer={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClick={actionStaff}
      onClose={onClose}
      refForm={form}
    >
     <form
      ref={form}
      action={actionStaff}
      className="flex flex-col items-center m-auto max-w-[827px]"
    >
      <div className="flex flex-col  gap-6 flex-wrap justify-around md:gap-12 sm:flex-row ">
        {formStaff.map(({ id, label, required, type, endContent }) => (
          <div key={id} className="sm:w-44">
            {type != "select" && id != 'cargo_id' && (
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
