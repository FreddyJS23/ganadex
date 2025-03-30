import { veterinario } from "@/types";
import {
  InputProps,
  Select,
  SelectItem,
  SelectSection,
  Selection,
} from "@nextui-org/react";
import { useState } from "react";

type SelectVeterinariesAndWorkersProps = Pick<
  InputProps,
  "id" | "description" | "label" | "required" | "errors"
> & {
  veterinaries: veterinario[];
  workers: veterinario[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  handleSelectionChange?: (select: string | number) => void;
};

export const SelectVeterinariesAndWorkers = ({
  id,
  label,
  description,
  required,
  errors,
  field,
  handleSelectionChange,
  veterinaries,
  workers,
}: SelectVeterinariesAndWorkersProps) => {
  const [value, setValue] = useState<Selection>(new Set([]));

  const onChange = (select: Selection) => {
    const valueSelect = Array.from(select)[0];

    handleSelectionChange &&
      handleSelectionChange(valueSelect as string | number);
  };

  return (
    <Select
      {...field}
      id={id}
      label={label}
      variant="underlined"
      color="primary"
      selectedKeys={value}
      isRequired={required}
      description={description}
      onSelectionChange={(keys) => {
        setValue(keys);
        onChange(keys);
      }}
      classNames={{
        label: "text-current font-bold",
        value: "text-current",
        popoverContent: "bg-base-100",
      }}
      isInvalid={errors[id] && true}
      errorMessage={errors[id] && (errors[id]?.message as string)}
    >
      <SelectSection title={"Veterinarios"}>
        {veterinaries.map((veterinario) => (
          <SelectItem key={veterinario.id}>{veterinario.nombre}</SelectItem>
        ))}
      </SelectSection>

      <SelectSection title={"Obreros"}>
        {workers.map((worker) => (
          <SelectItem key={worker.id}>{worker.nombre}</SelectItem>
        ))}
      </SelectSection>
    </Select>
  );
};
