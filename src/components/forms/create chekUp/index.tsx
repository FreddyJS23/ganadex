"use client";

import { createCheckUp } from "@/actions/revision";
import { formCheckUp } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/select";
import { SelectChecksType } from "@/components/select checks type";
import { Textarea } from "@/components/Textarea";
import {
  AvailableVaccines,
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
import { useEffect, useState } from "react";
import { SelectVaccines } from "@/components/select vaccines";

type FormCreateCheckUpProps = {
  veterinarios: veterinario[];
  typesCheck: TipoRevision[];
  listaVacunas: AvailableVaccines[];
  isAdmin: boolean;
};

export const FormCreateCheckUp = ({
  veterinarios,
  typesCheck,
  isAdmin,
  listaVacunas,
}: FormCreateCheckUpProps) => {
  const {
    register,
    formState: { errors },
    control,
    getValues,
    unregister,
    setValue,
    watch,
    resetField,
    handleSubmit,
  } = useForm<CreateBaseCheckUp | CreateAdminCheckUp>({
    resolver: zodResolver(
      isAdmin ? createAdminCheckUpShema : createBaseCheckUpShema,
    ),
    defaultValues: { fecha: getDateNow() },
  });
  const router = useRouter();
  const { id: cattleId } = useParams<{ id: string }>();
  const vacunaWacth = watch("vacuna_id");
  console.log(getValues());

  useEffect(() => {
    !vacunaWacth && unregister("vacuna_id");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vacunaWacth]);

  const actionCreatecheckUp: () => void = handleSubmit(async (data) => {
    const response = await createCheckUp(data, Number.parseInt(cattleId));
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));

    toast.success(`Revision creada`);
    router.back();
    router.refresh();
  });

  /* filtrar tipos de revisión para excluir las opciones medicas, 
  las primeras 4 opciones son predeterminadas del sistema, ademas añadir opción medica
  para activar select de vacunas */
  const tiposRevisionSistema = typesCheck
    .filter((type) =>
      ["Gestación", "Descartar", "Aborto", "Rutina"].includes(type.tipo),
    )
    .concat({ id: 0, tipo: "Medica", codigo: null });

  /* añadir opción medica al inicio de la lista para mostrar select de vacunas o revisiones medicas */
  const tiposRevisionSelect = converToSelectOptions(tiposRevisionSistema as []);

  /* Filtrar tipos de revisión para excluir las opciones iniciales */
  const tiposMedicos = typesCheck.filter(
    (type) =>
      !["Gestación", "Descartar", "Aborto", "Rutina"].includes(type.tipo),
  );

  const [tipoRevision, setTipoRevision] = useState<TipoRevision | null>(null);

  const handleTypeCheck = (value: string | number) => {
    const tipo = tiposRevisionSistema.find((type) => type.id == value);

    if (tipo) {
      setTipoRevision(tipo);
      /* el tipo revision no existe en el backend, solo se usa en el frontend para mostrar la select,
    por ende hay que resetear el campo tipo_revision_id, para que cuando se seleccione tipo revision medica
    se seleccione en diagnostico y este tomaria el nuevo valor para tipo_revision_id */
      //tipo revision medica
      if (value == 0) {
        resetField("tipo_revision_id");
        return;
      }
      // tipo revision aborto
      else if (value == 3) return;
      //resto revisiones
      else {
        unregister("tratamiento");
        unregister("vacuna_id");
        setValue("tipo_revision_id", value as string);
      }

      return;
    }
    setTipoRevision(null);
  };

  return (
    <>
      <form
        action={actionCreatecheckUp}
        className="flex flex-col items-center gap-6 max-w-2xl m-auto"
      >
        <div className="grid md:gap-12 lg:grid-cols-3 w-full">
          {/* Select Tipo de Revisión */}
          <div className="w-full self-center">
            <Select
              field={{
                value: tipoRevision,
              }}
              handleSelectionChange={handleTypeCheck}
              id="tipo_revision"
              items={tiposRevisionSelect}
              label="Tipo de Revisión"
              errors={errors}
              required={true}
            />
          </div>

          {/* revision no medica */}
          {tipoRevision && tipoRevision.tipo != "Medica" && (
            <>
              <Textarea
                id="observacion"
                label="Observación"
                required={false}
                errors={errors}
                register={register}
              />
              {tipoRevision.tipo == "Aborto" && (
                <Textarea
                  id="tratamiento"
                  label="Tratamiento"
                  required={false}
                  errors={errors}
                  register={register}
                />
              )}
            </>
          )}

          {/* revisiones medicas, select vacunas */}
          {tipoRevision?.tipo === "Medica" && (
            <>
              <div className="w-full flex gap-2 items-center">
                <ButtonCreateItem
                  tittle="Nuevo diagnóstico"
                  small={true}
                  href={"/revisiones/tipo/crear"}
                />
                <Controller
                  name="tipo_revision_id"
                  control={control}
                  render={({ field }) => (
                    <SelectChecksType
                      field={field}
                      id="tipo_revision_id"
                      items={tiposMedicos}
                      label="Diagnóstico"
                      errors={errors}
                      required={true}
                    />
                  )}
                />
              </div>

              <Textarea
                id="tratamiento"
                label="Tratamiento"
                required={false}
                errors={errors}
                register={register}
              />

              <div className="w-full flex gap-2 items-center">
                <ButtonCreateItem
                  tittle="Nueva vacuna"
                  small={true}
                  href={"/vacuna/registrar"}
                />
                <Controller
                  name="vacuna_id"
                  control={control}
                  render={({ field }) => (
                    <SelectVaccines
                      type="form"
                      errors={errors}
                      required={true}
                      vaccinesSelect={listaVacunas}
                      field={field}
                      filterByTipoVacuna="medica"
                    />
                  )}
                />
              </div>
              {vacunaWacth && (
                <Input
                  id="dosis"
                  label="Dosis"
                  required={true}
                  type="number"
                  errors={errors}
                  register={register}
                  endContent="ml"
                />
              )}
            </>
          )}

          {/* Campos comunes */}
          <Input
            id="fecha"
            label="Fecha"
            defaultValue={getDateNow()}
            required={true}
            type="date"
            errors={errors}
            register={register}
          />
          {isAdmin && (
            <div className="w-full flex gap-2 items-center">
              <ButtonCreateItem
                tittle="Nuevo veterinario"
                small={true}
                href={"/personal/registrar"}
              />

              <Controller
                name={"personal_id"}
                control={control}
                render={({ field }) => (
                  <Select
                    field={field}
                    id={"personal_id"}
                    items={converToSelectOptions(veterinarios)}
                    label={"Veterinario"}
                    errors={errors}
                    required={true}
                  />
                )}
              />
            </div>
          )}
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
