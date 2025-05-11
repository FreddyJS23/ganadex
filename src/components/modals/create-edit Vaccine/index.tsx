"use client";

import { useRef, useState, useEffect, use } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVaccine, updateVaccine } from "@/actions/vacuna";
import { toast } from "sonner";
import {
  Checkbox,
  Select as SelectNextUI,
  SelectItem,
  type Selection,
  useDisclosure,
  SelectSection,
} from "@nextui-org/react";
import type { CreateVaccine } from "@/types/forms";
import { useRouter } from "next/navigation";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { LayoutModal } from "..";
import { formVaccine } from "@/collections/formsInputs";
import { createVaccineSchema } from "@/validations/vaccineSchema";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/select";
import { typeCasttleSelect } from "@/collections/typeCastleSelect";
import { Vaccine } from "@/types";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";

type ModalCreateVaccineBase = {
  type: "create";
};

type ModalUpdateVaccineProps = {
  id: number;
  type: "update";
  isOpen: boolean;
  onClose: () => void;
  vaccine: Vaccine;
};

type ModalCreateEditVaccineProps =
  | ModalCreateVaccineBase
  | ModalUpdateVaccineProps;

export const ModalCreateEditVaccine = (props: ModalCreateEditVaccineProps) => {
  const router = useRouter();
  const formRef = useRef(null);
  const { type } = props;

  const { onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<CreateVaccine>({
    resolver: zodResolver(createVaccineSchema),
    defaultValues:
      props.type == "update"
        ? { ...props.vaccine }
        : {
            aplicable_a_todos: false,
          },
  });

  const { activateLoading, disableLoading } = useLoadingButtonModal();

  //transformar el tipo ganado para que sea compatible con la validacion del backend
  const transfomedTypeCattleSelect = (
    typeCastle: Vaccine["tipos_ganado"] | null,
  ) => {
    if (!typeCastle) return null;

    const typesCattleTranformed: CreateVaccine["tipo_ganados"] = typeCastle.map(
      (item) => {
        return { ganado_tipo_id: item.id, sexo: item.sexo };
      },
    );
    console.log(typesCattleTranformed);
    return { typesCattleTranformed };
  };

  //Estado para el campo tipo ganados
  const [tipoGanados, setTipoGanados] = useState<
    CreateVaccine["tipo_ganados"] | null
  >(
    type == "update"
      ? transfomedTypeCattleSelect(props.vaccine.tipos_ganado)
          ?.typesCattleTranformed
      : null,
  );

  //Estado para el check de aplicabilidad a todos
  const [isApplicableToAll, setIsApplicableToAll] = useState(false);

  const handleCheckbox = (value: boolean) => {
    value && setTipoGanados(null);
    setIsApplicableToAll(value);
  };

  //usar el effect para actualizar los estado al cambiar entre registros
  useEffect(() => {
    if (props.type == "update") {
      setTipoGanados(
        transfomedTypeCattleSelect(props.vaccine.tipos_ganado)
          ?.typesCattleTranformed,
      );
      setIsApplicableToAll(props.vaccine.aplicable_a_todos);
    }
  }, [props]);

  const actionVaccine: () => void = handleSubmit(async (data) => {
    activateLoading();
    const payload = !isApplicableToAll
      ? { ...data, tipo_ganados: tipoGanados }
      : data;
    if (type === "create") {
      const response = await createVaccine(payload);
      if (typeof response == "object" && "error" in response) {
        disableLoading();
        return toast.error(messageErrorApi(response));
      }
      toast.success(`Vacuna creada`);
    } else if (type === "update" && "id" in props) {
      const response = await updateVaccine(props.id, payload);
      if (typeof response == "object" && "error" in response) {
        disableLoading();
        return toast.error(messageErrorApi(response));
      }
      disableLoading();
      toast.success(`Vacuna actualizada`);
      props.onClose();
      return router.push("/vacuna");
    }
    disableLoading();
    router.back();
    router.refresh();
  });

  return (
    <LayoutModal
      icon="checkUp"
      titleModal={type === "create" ? "Crear vacuna" : "Actualizar vacuna"}
      footer={true}
      isOpen={type === "create" ? true : props.isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
      onClose={type == "update" ? props.onClose : undefined}
    >
      <form
        ref={formRef}
        id="form-createUpdateVaccine"
        action={actionVaccine}
        className="flex flex-col items-center gap-6 p-4 m-auto max-w-[827px]"
      >
        <div className="flex flex-col gap-4 gap-y-8 flex-wrap justify-around  sm:flex-row ">
          {formVaccine.map(({ id, label, required, type, select }) => (
            <div key={id} className="sm:w-44">
              {type != "select" &&
                type != "checkbox" &&
                id != "aplicable_a_todos" && (
                  <Input
                    key={id}
                    id={id}
                    label={label}
                    required={required}
                    type={type}
                    register={register}
                    errors={errors}
                    defaultValue={
                      props.type === "update"
                        ? (props.vaccine[id] ?? undefined)
                        : undefined
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
                      items={select as []}
                      label={label}
                      errors={errors}
                      required={required}
                      value={
                        props.type === "update"
                          ? props.vaccine["tipo_vacuna"]
                          : undefined
                      }
                    />
                  )}
                />
              )}

              {/*  checkbobos */}
              {type == "checkbox" && (
                <Controller
                  name={id}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      title="La vacuna será aplicada a todos los tipos de ganado"
                      isSelected={isApplicableToAll}
                      onValueChange={handleCheckbox}
                      {...field}
                      id={id}
                      required={required}
                    >
                      {label}
                    </Checkbox>
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <GanadoTiposVacuna
          setTipoGanados={setTipoGanados}
          isDisabled={isApplicableToAll}
          initialSelected={
            type == "update"
              ? transfomedTypeCattleSelect(props.vaccine.tipos_ganado)
                  ?.typesCattleTranformed
              : undefined
          }
        />
      </form>
    </LayoutModal>
  );
};

const GanadoTiposVacuna = ({
  setTipoGanados,
  isDisabled,
  initialSelected,
}: {
  setTipoGanados: React.Dispatch<
    React.SetStateAction<CreateVaccine["tipo_ganados"] | null>
  >;
  isDisabled: boolean;
  initialSelected: CreateVaccine["tipo_ganados"];
}) => {
  const typeCasttleSelectWithGender = [
    { value: 1, label: "Becerro", sexo: "M" },
    { value: 2, label: "Maute", sexo: "M" },
    { value: 3, label: "Novillo", sexo: "M" },
    { value: 4, label: "Adulto", sexo: "M" },
    { value: 1, label: "Becerra", sexo: "H" },
    { value: 2, label: "Mauta", sexo: "H" },
    { value: 3, label: "Novilla", sexo: "H" },
    { value: 4, label: "Adulta", sexo: "H" },
  ];

  const valuesSelected = initialSelected
    ? initialSelected.map((tipo) => {
        const typeCattleVaccine = typeCasttleSelectWithGender.find((t) => {
          if (tipo.sexo == "M") return tipo.ganado_tipo_id == t.value;
          else return t.sexo == "H" && tipo.ganado_tipo_id == t.value;
        });

        return typeCattleVaccine ? typeCattleVaccine.label : "";
      })
    : [];
  const [selected, setSelected] = useState<Selection>(new Set(valuesSelected));

  const handleSelectionChange = (keys: Selection) => {
    setSelected(keys);
    const updatedTipoGanados = Array.from(keys).map((key) => {
      const selectedOption = typeCasttleSelectWithGender.find(
        (option) => option.label === key,
      );
      return {
        ganado_tipo_id: selectedOption?.value as number,
        sexo: selectedOption?.sexo ?? "M",
      } as { ganado_tipo_id: number; sexo: "H" | "M" };
    });
    setTipoGanados(updatedTipoGanados);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="font-bold">Tipos de Ganado</label>
      <SelectNextUI
        aria-label="Tipos de Ganado"
        placeholder="Elige uno o más tipos"
        selectedKeys={selected}
        onSelectionChange={handleSelectionChange}
        selectionMode="multiple"
        variant="underlined"
        color="primary"
        classNames={{
          label: "text-current font-bold",
          value: "text-current",
          popoverContent: "bg-base-100",
        }}
        description="Estos tipos son los que se les podrá aplicar la vacuna"
        isDisabled={isDisabled}
      >
        {typeCasttleSelectWithGender.map(({ label }) => (
          <SelectItem key={label} textValue={label}>
            {label}
          </SelectItem>
        ))}
      </SelectNextUI>
    </div>
  );
};
