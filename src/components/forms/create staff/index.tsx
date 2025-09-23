"use client";

import { createStaff } from "@/actions/personal";
import { formStaff } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/selects/select";
import type { ResponseCargosPersonal } from "@/types";
import type { CreateStaff } from "@/types/forms";
import { Button } from "@/ui/Button";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { createStaffShema } from "@/validations/staffShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const FormCreateStaff = ({
  cargos_personal,
}: ResponseCargosPersonal) => {
  const form = useRef<HTMLFormElement | null>(null);

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

    form.current?.reset();

    toast.success(`${response} ha sido creado con éxito`);
  });

  return (
    <form
      ref={form}
      action={actionStaff}
      className="flex flex-col items-center gap-6  m-auto max-w-[827px]"
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
      <div className="w-full sm:max-w-72">
        <Button
          type="submit"
          onClick={() => {
            return;
          }}
          content="Registrar"
        />
      </div>
    </form>
  );
};
