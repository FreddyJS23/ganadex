"use client";

import { createCheckUp } from "@/actions/revision";
import { formCheckUp } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/select";
import { SelectChecksType } from "@/components/select checks type";
import { Textarea } from "@/components/Textarea";
import {
  ResponseVeterinariosSelect,
  type TipoRevision,
  type veterinario,
} from "@/types";
import type { CreateAdminCheckUp, CreateBaseCheckUp } from "@/types/forms";
import { Button } from "@/ui/Button";
import { ButtonCreateItem } from "@/ui/ButtonCreate";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";
import { getDateNow } from "@/utils/getDateNow";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import {
  createAdminCheckUpShema,
  createBaseCheckUpShema,
} from "@/validations/checkUpShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormCreateCheckUpProps = {
  veterinarios: veterinario[];
  typesCheck: TipoRevision[];
  isAdmin: boolean;
};

export const FormCreateCheckUp = ({
  veterinarios,
  typesCheck,
  isAdmin,
}: FormCreateCheckUpProps) => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CreateBaseCheckUp | CreateAdminCheckUp>({
    resolver: zodResolver(
      isAdmin ? createAdminCheckUpShema : createBaseCheckUpShema,
    ),
    defaultValues: { fecha: getDateNow() },
  });
  const router = useRouter();
  const { id: cattleId } = useParams<{ id: string }>();

  const actionCreatecheckUp: () => void = handleSubmit(async (data) => {
    const response = await createCheckUp(data, Number.parseInt(cattleId));
    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    toast.success(`Revision creada`);
    router.back();
    router.refresh();
  });

  return (
    <>
      <form
        action={actionCreatecheckUp}
        className="flex flex-col items-center gap-6 max-w-2xl m-auto"
      >
        <div className="grid  md:gap-12 lg:grid-cols-3 w-full">
          {formCheckUp.map(({ id, label, required, type }) => (
            <>
              {id == "tratamiento" && (
                <Textarea
                  key={id}
                  id={id}
                  label={label}
                  required={required}
                  errors={errors}
                  register={register}
                />
              )}
              {type == "text" && id != "tratamiento" && (
                <Input
                  key={id}
                  id={id}
                  label={label}
                  required={required}
                  type="text"
                  errors={errors}
                  register={register}
                />
              )}

              {id == "fecha" && (
                <Input
                  key={id}
                  id={id}
                  label={label}
                  defaultValue={getDateNow()}
                  required={required}
                  type="date"
                  errors={errors}
                  register={register}
                />
              )}

              {type == "select" && id == "tipo_revision_id" && (
                
                <div className="w-full flex gap-2 items-center">
                  <ButtonCreateItem
                    tittle="Nuevo tipo de revisión"
                    small={true}
                    href={"/revisiones/tipo/crear"}
                  />

                  <Controller
                    name={id}
                    control={control}
                    render={({ field }) => (
                      <SelectChecksType
                        field={field}
                        id={id}
                        items={typesCheck}
                        label={label}
                        errors={errors}
                        required={required}
                      />
                    )}
                  />
                </div>
              )}

              {type == "select" && id == "personal_id" && isAdmin && (
                <div className="w-full flex gap-2 items-center">
                  <ButtonCreateItem
                    tittle="Nuevo veterinario"
                    small={true}
                    href={"/personal/registrar"}
                  />
                    
                  <Controller
                  name={id}
                  control={control}
                  render={({ field }) => (
                    <Select
                      field={field}
                      id={id}
                      items={converToSelectOptions(veterinarios)}
                      label={label}
                      errors={errors}
                      required={required}
                    />
                  )}
                />
                </div>
              )}
            </>
          ))}
        </div>
        <div className="w-full sm:max-w-72">
          <Button
            onClick={() => {
              return;
            }}
            type="submit"
            content="Registrar"
          />
        </div>
      </form>
    </>
  );
};
