"use client";

import { addInHacienda, createStaff } from "@/actions/personal";
import { formStaff } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/select";
import { ResponseCargosPersonal } from "@/types";
import { CreateStaff } from "@/types/forms";
import { Button } from "@/ui/Button";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { createStaffShema } from "@/validations/staffShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import IconAdd from "@/icons/icono-plus.svg";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const FormCreateStaff = ({
  cargos_personal,
}: ResponseCargosPersonal) => {
  const form = useRef<HTMLFormElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const actionAddPersonal = async (personal_id: number) => {
    setIsLoading(true);
    const response = await addInHacienda(personal_id);
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));
    else toast.success(response);
    setIsLoading(false);
  };

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

    /* manejar error del backedn y mostar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    form.current?.reset();

    toast.success(
      `${response.nombre} ha sido creado ${response.cargo == "veterinario" ? ",en el siguiente boton se puede añadir a la hacienda actual" : ""}`,
      {
        action: response.cargo == "veterinario" && (
          <div className="max-w-24">
            <Button
              content={<IconAdd className={"size-6"} />}
              onClick={async () => await actionAddPersonal(response.id)}
            />
          </div>
        ),
      },
    );
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
