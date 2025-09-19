import type { AvailableVaccines } from "@/types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import {
  InputProps,
  Select,
  SelectItem,
  SelectSection,
  type Selection,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

type SelectVaccinesFormProps = Pick<InputProps, "required" | "errors"> & {
  vaccinesSelect: AvailableVaccines[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  filterByTipoVacuna?: "medica" | "plan_sanitario" | "ambas";
  /**Identifica si el select es para el form o para la lista de vacunas */
  type: "form";
};

type SelectVaccinesProps = {
  vaccinesSelect: AvailableVaccines[];
  isInvalidSelect: boolean;
  setValueSelect: React.Dispatch<React.SetStateAction<number | null>>;
  valueSelect: number | null;
  filterByTipoVacuna?: "medica" | "plan_sanitario" | "ambas";
  type: "listVaccination";
};

export const SelectVaccines = (
  props: SelectVaccinesProps | SelectVaccinesFormProps,
) => {
  const { type, vaccinesSelect, filterByTipoVacuna = "ambas" } = props;

  const groupByTipoVacuna = (vaccinesSelect: AvailableVaccines[]) => {
    const tiposVacuna: string[] = [];
    vaccinesSelect.forEach(({ tipo_vacuna }) => {
      if (!tiposVacuna.includes(tipo_vacuna)) {
        tiposVacuna.push(tipo_vacuna);
      }
    });
    return tiposVacuna;
  };

  const filteredVaccines = vaccinesSelect.filter(({ tipo_vacuna }) => {
    if (filterByTipoVacuna === "ambas") return true;
    return tipo_vacuna === filterByTipoVacuna;
  });

  const valueSelect =
    props.type == "listVaccination" ? props.valueSelect : null;

  useEffect(() => {
    valueSelect == null && setValue(new Set([]));
  }, [valueSelect]);

  const [value, setValue] = useState<Selection>(new Set([]));

  /* tipar color y variant para evitar error de tipo al destructurar las props
   */
  const color:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger" = "primary";
  const variant: "flat" | "faded" | "bordered" | "underlined" = "underlined";

  const propsSelect = {
    id: "vacuna_id",
    label: "Vacunas",
    color: color,
    description: "Vacunas",
    variant: variant,
    items: filteredVaccines,
    classNames: {
      label: "text-current font-bold",
      value: "text-current",
      popoverContent: "bg-base-100",
    },
  };

  return type == "listVaccination" ? (
    <Select
      {...propsSelect}
      isInvalid={props.isInvalidSelect}
      selectedKeys={value}
      onSelectionChange={(keys) => {
        setValue(keys);
        props.setValueSelect(Number.parseInt(Array.from(keys)[0] as string));
      }}
    >
      {groupByTipoVacuna(filteredVaccines).map((tipoVacuna) => (
        <SelectSection
          key={tipoVacuna}
          title={capitalizeFirstLetter(
            tipoVacuna === "medica" ? "Médica" : "Plan Sanitario",
          )}
        >
          {filteredVaccines
            .filter(({ tipo_vacuna }) => tipo_vacuna === tipoVacuna)
            .map((vaccine) => (
              <SelectItem key={vaccine.id} textValue={vaccine.nombre}>
                <div className="flex flex-col">
                  <span>{vaccine.nombre}</span>
                  <span className="text-[12px] opacity-60">
                    {vaccine.aplicable_a_todos
                      ? "Todos"
                      : vaccine.tipos_ganado && vaccine.tipos_ganado 
                          .map(({ tipo, sexo }) => `${tipo} (${sexo})`)
                          .join(", ")}
                  </span>
                </div>
              </SelectItem>
            ))}
        </SelectSection>
      ))}
    </Select>
  ) : (
    <Select
      {...props.field}
      {...propsSelect}
      isInvalid={props.errors["vacuna_id"] && true}
      errorMessage={props.errors["vacuna_id"]?.message}
      selectedKeys={value}
      onSelectionChange={(keys) => {
        setValue(keys);
      }}
    >
      {groupByTipoVacuna(filteredVaccines).map((tipoVacuna) => (
        <SelectSection
          key={tipoVacuna}
          title={capitalizeFirstLetter(
            tipoVacuna === "medica" ? "Médica" : "Plan Sanitario",
          )}
        >
          {filteredVaccines
            .filter(({ tipo_vacuna }) => tipo_vacuna === tipoVacuna)
            .map((vaccine) => (
              <SelectItem key={vaccine.id} textValue={vaccine.nombre}>
                <div className="flex flex-col">
                  <span>{vaccine.nombre}</span>
                  <span className="text-[12px] opacity-60">
                    {vaccine.aplicable_a_todos
                      ? "Todos"
                      :vaccine.tipos_ganado && vaccine.tipos_ganado
                          .map(({ tipo, sexo }) => `${tipo} (${sexo})`)
                          .join(", ")}
                  </span>
                </div>
              </SelectItem>
            ))}
        </SelectSection>
      ))}
    </Select>
  );
};
