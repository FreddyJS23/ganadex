"use client";

import {
  formBull,
  formDeadCattle as formDeadBull,
  formSaleCattle as formSaleBull,
} from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Button } from "@/ui/Button";
import { Select } from "@/components/select";
import { Select as SelectNextUI, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateBull } from "@/types/forms";
import { toast } from "sonner";
import {
  bullShemaWitDeath,
  bullShemaWithSale,
  createBullShema,
} from "@/validations/bullShema";
import { createBull } from "@/actions/toro";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Checkbox, Chip, type Selection } from "@nextui-org/react";
import type {
  AvailableVaccines,
  CausaFallecimiento,
  Comprador,
  ListaVacunas,
} from "@/types";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { CreateListVaccination } from "@/components/create list vaccination";
import { useRouter } from "next/navigation";

type FormBullProps = {
  compradores: Comprador[];
  listaVacunas: AvailableVaccines[];
  numero_disponible: number;
  causas_fallecimeinto: CausaFallecimiento[];
};

export const FormBull = ({
  compradores,
  numero_disponible,
  causas_fallecimeinto,
  listaVacunas,
}: FormBullProps) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [shema, setshema] = useState<
    typeof createBullShema | typeof bullShemaWitDeath | typeof bullShemaWithSale
  >(createBullShema);
  /* states of the bull */
  const [states, setStates] = useState<Selection>(new Set("1"));

  /* Lista de vacunas */
  const [listVaccines, setListVaccines] = useState<ListaVacunas[]>([]);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<CreateBull>({
    resolver: zodResolver(shema),
    defaultValues: { estado_id: ["1"], numero: numero_disponible },
  });
  const handleSelectionTypeBullChange = (select: number | string) => {
    /* posición del container campo peso dos años */
    const inputWeight2year = form.current?.querySelector(
      "#peso_2year",
    ) as HTMLDivElement;

    if (select == 1) {
      /* se usa el setValue porque el resetField no funciona, no borra el valor en el input */
      setValue("peso_2year", undefined);
      inputWeight2year.classList.add("hidden");
    } else inputWeight2year.classList.remove("hidden");
  };

  const actionBull: () => void = handleSubmit(async (data) => {
    const response = await createBull(data, listVaccines);
    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response!)
      return toast.error(messageErrorApi(response));

    form.current?.reset();
    router.refresh();
    setListVaccines([]);
    setStates(new Set("1"));
    setShowinputDead(false);
    setShowinputSale(false);
    toast.success(`Toro numero ${response} ha sido registrado`);
  });
  /* actualizar numero del input al obtener nuevo numero */
  useEffect(() => {
    setValue("numero", numero_disponible);
  }, [numero_disponible, setValue]);

  /* select states of the castle */
  const { id, label, required, select } = formBull[formBull.length - 1];

  const [showinputDead, setShowinputDead] = useState(false);
  const [showinputSale, setShowinputSale] = useState(false);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    
      /* se hace un slice de la primera posición para quitar el primer carácter "," 
    que es el separador de selección, ya que al no haber nada en el select, y seleccionar algo
    se posicionaba una coma quedan ",3" y no "3" que es el valor que se espera */
    const valuesStates =
      e.target.value.startsWith(',') 
        ? e.target.value.slice(1).split(",") 
        : e.target.value.split(",");
    
    
    /* state sale */
    if (valuesStates.some((value) => value == "5")) {
      setshema(bullShemaWithSale);
      setStates(new Set("5"));
      setValue("estado_id", ["5"]);
      setShowinputSale(true);
      setShowinputDead(false);
    } else if (valuesStates.some((value) => value == "2")) {
      /* state dead */
      setshema(bullShemaWitDeath);
      setStates(new Set("2"));
      setValue("estado_id", ["2"]);
      setShowinputDead(true);
      setShowinputSale(false);
    } else {
      /* other states */
      setShowinputDead(false);
      setShowinputSale(false);
      setshema(createBullShema);
      setValue("estado_id", valuesStates);
      setStates(new Set(valuesStates));
    }
  };

  /* control de check para mostrar campos sección vacuna */
  const [isSelected, setIsSelected] = useState(false);

  // campos select tipo origen para coloca campo fecha ingreso en origen externo
  const {
    id: dateEntryId,
    label: dateEntryLabel,
    required: dateEntryRequired,
  } = formBull[6];

  const [origen, setOrigen] = useState<1 | 2>(1);

  const handleSelectionOrigenChange = (select: string | number) => {
    if (select == 1) {
      /* se usa el setValue porque el resetField no funciona, no borra el valor en el input,
            sin esto el valor se mantiene en el input y al enviar  el backend dará error ya que se esta mandando 
            el valor de fecha_ingreso en un formato incorrecto */
      setValue("fecha_ingreso", undefined);
    }
    setOrigen(select as 1 | 2);
  };

  return (
    <form
      ref={form}
      action={actionBull}
      className="grid grid-cols-2 m-auto max-w-5xl  gap-4 gap-y-7 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4 "
    >
      {formBull.map(
        ({
          id,
          label,
          required,
          type,
          select,
          endContent,
          tooltipTipoGanado,
        }) => (
          <>
            {id != "estado_id" && id != "fecha_ingreso" && (
              <div key={id} id={id}>
                {type != "select" && (
                  <Input
                    id={id}
                    label={label}
                    type={type}
                    endContent={endContent}
                    register={register}
                    errors={errors}
                    required={required}
                    defaultValue={
                      id == "numero" ? String(numero_disponible) : undefined
                    }
                  />
                )}
                {/*  select normal */}
                {type == "select" && select && (
                  <Controller
                    name={id}
                    control={control}
                    render={({ field }) => (
                      <Select
                        field={field}
                        id={id}
                        items={select}
                        label={label}
                        errors={errors}
                        required={required}
                        tooltipTipoGanado={
                          id != "origen_id" && tooltipTipoGanado
                        }
                        handleSelectionChange={
                          id == "origen_id"
                            ? handleSelectionOrigenChange
                            : handleSelectionTypeBullChange
                        }
                        tipo="toro"
                      />
                    )}
                  />
                )}
              </div>
            )}
          </>
        ),
      )}

      {/* campo fecha ingreso condiciona si se selecciono origen externo */}
      {origen == 2 && (
        <Input
          id={dateEntryId}
          label={dateEntryLabel}
          type={"date"}
          register={register}
          errors={errors}
          required={dateEntryRequired}
        />
      )}

      {/* lista de vacunas */}
      <div className="col-span-full md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-2">
        <div className="flex flex-col items-center gap-2">
          <Checkbox
            title="Añadir vacunas"
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            Vacunas
          </Checkbox>
          <CreateListVaccination
            vaccinesSelect={listaVacunas}
            listVaccines={listVaccines}
            setListVaccines={setListVaccines}
            isChecked={isSelected}
          />
        </div>
      </div>

      {/* inputs dead cattle */}
      {showinputDead &&
        formDeadBull.map(({ id, label, required, type, endContent }) => (
          <>
            <div key={id}>
              {type == "text" && (
                <Input
                  id={id}
                  label={label}
                  type={type}
                  endContent={endContent}
                  register={register}
                  errors={errors}
                  required={required}
                />
              )}
              {type == "select" && (
                <Controller
                  name={id}
                  /*Se interpone un any ya que esta heredando el tipo del formulario completo
                                        ocasionando conflicto de tipos ya que los campos del formulario no están presentes  */
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  control={control as any}
                  render={({ field }) => (
                    <Select
                      field={field}
                      id={id}
                      items={converToSelectOptions(causas_fallecimeinto)}
                      label={label}
                      errors={errors}
                      required={required}
                    />
                  )}
                />
              )}
              {id == "fecha" && (
                <Input
                  /* El id se debe cambiar ya que se usa una shema validación diferente
                                        al original */
                  id={"fecha_fallecimiento"}
                  label={label}
                  type={type}
                  endContent={endContent}
                  register={register}
                  errors={errors}
                  required={required}
                />
              )}
            </div>
          </>
        ))}

      {/* inputs sale cattle */}
      {showinputSale &&
        formSaleBull.map(({ id, label, required, type, endContent }) => (
          <>
            <div key={id}>
              {type != "select" && type != "date" && (
                <Input
                  id={id}
                  label={label}
                  type={type}
                  endContent={endContent}
                  register={register}
                  errors={errors}
                  required={required}
                />
              )}
              {type == "date" && (
                <Input
                  /* El id se debe cambiar ya que se usa una shema validación diferente
                                        al original */
                  id={"fecha_venta"}
                  label={label}
                  type={type}
                  endContent={endContent}
                  register={register}
                  errors={errors}
                  required={required}
                />
              )}
              {type == "select" && (
                <Controller
                  name={id}
                  /*Se interpone un any ya que esta heredando el tipo del formulario completo
                            ocasionando conflicto de tipos ya que los campos del formulario no están presentes  */
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  control={control as any}
                  render={({ field }) => (
                    <Select
                      field={field}
                      id={id}
                      items={converToSelectOptions(compradores as [])}
                      label={label}
                      errors={errors}
                      required={required}
                    />
                  )}
                />
              )}
            </div>
          </>
        ))}

      {/*   select multiple */}
      {
        <div
          key={id}
          className="col-span-full md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-2"
        >
          {
            <Controller
              name={id}
              /*Se interpone un any ya que esta heredando el tipo del formulario completo
                            ocasionando conflicto de tipos ya que los campos del formulario no están presentes  */
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              control={control as any}
              render={({ field }) => (
                <SelectNextUI
                  {...field}
                  label={label}
                  items={select}
                  selectionMode="multiple"
                  variant="underlined"
                  color="primary"
                  size="lg"
                  selectedKeys={states}
                  labelPlacement="outside"
                  isRequired={required}
                  onChange={handleSelectionChange}
                  isInvalid={errors[id] && true}
                  errorMessage={errors[id] && errors[id]?.message}
                  classNames={{
                    innerWrapper: "h-fit",
                    trigger: "h-fit",
                    label: "top-4 text-current  font-bold",
                    popoverContent: "bg-base-100",
                  }}
                  renderValue={(items) => {
                    return (
                      <div className="flex flex-wrap gap-2 p-2 md:p-4">
                        {items.map((item) => (
                          <Chip
                            color="primary"
                            key={item.key}
                            className="text-xs md:text-base"
                          >
                            {item.data?.label}
                          </Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {({ label, value }) => (
                    <SelectItem key={value}>{label}</SelectItem>
                  )}
                </SelectNextUI>
              )}
            />
          }
        </div>
      }

      <div className="col-span-full md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-2">
        <Button
          onClick={() => {
            return;
          }}
          type="submit"
          content="Registrar"
        />
      </div>
    </form>
  );
};
