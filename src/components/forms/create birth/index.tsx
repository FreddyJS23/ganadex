"use client";

import { createBirth } from "@/actions/parto";
import { formBirth, formCalfCastle } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/selects/select";
import { SelectVeterinariesAndWorkers } from "@/components/selects/select veterinaries & workers";
import { Textarea } from "@/components/Textarea";
import type { veterinario } from "@/types";
import type { CreateAdminBirth, CreateBaseBirth } from "@/types/forms";
import { Button } from "@/ui/Button";
import { ButtonCreateItem } from "@/ui/ButtonCreate";
import { getDateNow } from "@/utils/getDateNow";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import {
  createAdminBirthShema,
  createBaseBirthShema,
} from "@/validations/birthShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormCreateBirthProps = {
  veterinarios: veterinario[];
  obreros: veterinario[];
  numero_disponible: number;
  isAdmin: boolean;
};

export const FormCreateBirth = ({
  veterinarios,
  numero_disponible,
  isAdmin,
  obreros,
}: FormCreateBirthProps) => {
  /* [key in FieldsCalfCastle['id']]:any */
  /* valores formulario cría ganado */
  const valuesInitFormCalfCastle: CreateBaseBirth["crias"][0] = {
    nombre: "",
    numero: numero_disponible,
    sexo: "H",
    peso_nacimiento: 0,
    observacion: "",
  };

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CreateBaseBirth | CreateAdminBirth>({
    resolver: zodResolver(
      isAdmin ? createAdminBirthShema : createBaseBirthShema,
    ),
    defaultValues: { fecha: getDateNow(), crias: [valuesInitFormCalfCastle] },
  });

  /* campos array crías */
  const { fields, append, remove } = useFieldArray({
    control,
    name: "crias",
  });

  /* check doble cria */
  const [isSelected, setIsSelected] = useState(false);

  const handleChangeCheckbox = () => {
    //como no hay un renderizado no se actualiza el estado y no se puede obtener el valor actual del select
    //por ende se asumen que aquí el valor debe ser el contrario
    const actualValue = !isSelected;
    if (actualValue) {
      /* para no crear un numero repetido */
      append({ ...valuesInitFormCalfCastle, numero: numero_disponible + 1 });
    } else {
      remove(1);
    }
  };

  const router = useRouter();
  const { id: cattleId } = useParams<{ id: string }>();
  const actionCreateBirth: () => void = handleSubmit(async (data) => {
    const response = await createBirth(data, Number.parseInt(cattleId));
    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response!)
      return toast.error(messageErrorApi(response));
    toast.success(`Parto creado`);
    router.back();
    router.refresh();
  });

  return (
    <>
      <form
        action={actionCreateBirth}
        className="flex flex-col items-center gap-8  m-auto "
      >
        <div className="flex gap-6 flex-col justify-center max-w-80 sm:justify-evenly sm:flex-row sm:flex-wrap sm:max-w-fit ">
          {formBirth.map(({ id, label, required, type }) => (
            <div key={id} className={"sm:w-44"}>
              {id == "observacion" && (
                <Textarea
                  key={id}
                  id={id}
                  label={label}
                  required={required}
                  errors={errors}
                  register={register}
                />
              )}

              {id == "fecha" && (
                <Input
                  key={id}
                  id={id}
                  label={label}
                  required={required}
                  defaultValue={getDateNow()}
                  type="date"
                  errors={errors}
                  register={register}
                />
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
                      <SelectVeterinariesAndWorkers
                        id={id}
                        label={label}
                        description={"Veterinarios y obreros"}
                        field={field}
                        veterinaries={veterinarios}
                        workers={obreros}
                        errors={errors}
                        required={required}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* campos array crías */}
        <div className="flex flex-col">
          <div className="flex gap-4">
            <h3>Datos de la cria</h3>
            <Checkbox
              title="Registrar dos crias en caso que la vaca haya tenido morochos"
              isSelected={isSelected}
              onValueChange={setIsSelected}
              onClick={handleChangeCheckbox}
            >
              Nacimiento dos crias
            </Checkbox>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-4">
              {/* numerar crias en caso de que haya dos crías */}
              {isSelected && (
                <div>
                  {" "}
                  <h3>Cria #{index + 1}</h3>{" "}
                </div>
              )}

              <div className="flex gap-4 flex-col justify-center max-w-80 sm:justify-evenly sm:flex-row sm:flex-wrap sm:max-w-fit ">
                {formCalfCastle.map(({ id, label, required, type, select }) => (
                  <div key={id} className={"sm:w-44"}>
                    {id == "observacion" && (
                      <Textarea
                        id={`crias.${index}.${id}`}
                        key={`crias.${index}.${id}`}
                        label={label}
                        required={required}
                        errors={errors}
                        register={register}
                      />
                    )}
                    {type != "select" && id != "observacion" && (
                      <Input
                        key={`crias.${index}.${id}`}
                        id={`crias.${index}.${id}`}
                        label={label}
                        required={required}
                        type={type}
                        errors={errors}
                        register={register}
                        defaultValue={
                          id == "numero" ? String(field.numero) : undefined
                        }
                      />
                    )}

                    {type == "select" && id == "sexo" && (
                      <Controller
                        name={`crias.${index}.${id}`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            field={field}
                            id={`crias.${index}.${id}`}
                            items={select!}
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
            </div>
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
