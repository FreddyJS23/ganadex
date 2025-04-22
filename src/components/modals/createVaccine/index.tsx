"use client";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVaccine } from "@/actions/vacuna";
import { toast } from "sonner";
import {
  Checkbox,
  Select as SelectNextUI,
  SelectItem,
  type Selection,
  useDisclosure,
} from "@nextui-org/react";
import { ModalProps } from "@/types";
import { CreateVaccine } from "@/types/forms";
import { useRouter } from "next/navigation";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { LayoutModal } from "..";
import { formVaccine } from "@/collections/formsInputs";
import { createVaccineSchema } from "@/validations/vaccineSchema";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/select";

export const ModalCreateVaccine = () => {
  const router = useRouter();
  const formRef = useRef(null);

  const { onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateVaccine>({
    resolver: zodResolver(createVaccineSchema),
    defaultValues:{aplicable_a_todos:false}
  });
  const [tipoGanados, setTipoGanados] = useState<CreateVaccine["tipo_ganados"]>(
    [],
  );
  const [isApplicableToAll, setIsApplicableToAll] = useState(false);
  const actionVaccine: () => void = handleSubmit(async (data) => {
    const response = await createVaccine({
      ...data,
      tipo_ganados: tipoGanados,
    });
    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));
    toast.success(`Vacuna creada`);
    router.back();
    router.refresh();
  });

  return (
    <LayoutModal
      icon="checkUp"
      titleModal={"Crear vacuna"}
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        ref={formRef}
        id="form-createVaccine"
        action={actionVaccine}
        className="flex flex-col items-center gap-6 p-4 m-auto max-w-[827px]"
      >
        <div className="flex flex-col gap-4 gap-y-8 flex-wrap justify-around  sm:flex-row ">
          {formVaccine.map(({ id, label, required, type, select }) => (
            <div key={id} className="sm:w-44">
              {type != "select" && type != "checkbox" && (
                <Input
                  key={id}
                  id={id}
                  label={label}
                  required={required}
                  type={type}
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
                      items={select as []}
                      label={label}
                      errors={errors}
                      required={required}
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
                      title="La vacuna sera aplicada a todos los tipo de ganado"
                      isSelected={isApplicableToAll}
                      onValueChange={setIsApplicableToAll}
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
        />
      </form>
    </LayoutModal>
  );
};

const GanadoTiposVacuna = ({
  setTipoGanados,
  isDisabled,
}: {
  setTipoGanados: React.Dispatch<
    React.SetStateAction<{ id: number; sexo: "H" | "M" }[]>
  >;
  isDisabled: boolean;
}) => {
  const [selected, setSelected] = useState<Selection>(new Set());

  // Opciones del select en masculino y femenino
  const typeCasttleSelectWithGender = [
    { value: 1, label: "Becerro", sexo: "M" },
    { value: 2, label: "Maute", sexo: "M" },
    { value: 3, label: "Novillo", sexo: "M" },
    { value: 4, label: "Adulto", sexo: "M" },
    { value: 1 + 10, label: "Becerra", sexo: "H" },
    { value: 2 + 10, label: "Mauta", sexo: "H" },
    { value: 3 + 10, label: "Novilla", sexo: "H" },
    { value: 4 + 10, label: "Adulta", sexo: "H" },
  ];

  const handleSelectionChange = (keys: Selection) => {
    setSelected(keys);
    const updatedTipoGanados = Array.from(keys).map((key) => {
      const selectedOption = typeCasttleSelectWithGender.find(
        (option) => option.label === key,
      );
      return {
        id:
          selectedOption?.sexo == "H"
            ? selectedOption?.value - 10
            : selectedOption?.value,
        sexo: selectedOption?.sexo ?? "M",
      } as { id: number; sexo: "H" | "M" };
    });
    setTipoGanados(updatedTipoGanados);
  };

  return (
    <div className="flex flex-col  w-full">
      <label className="font-bold">Tipos de Ganado</label>
      <SelectNextUI
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
        description="Estos tipos son los se le podrá aplicar la vacuna"
        isDisabled={isDisabled}
      >
        {typeCasttleSelectWithGender.map(({ label }) => (
          <SelectItem key={label}>{label}</SelectItem>
        ))}
      </SelectNextUI>
    </div>
  );
};
