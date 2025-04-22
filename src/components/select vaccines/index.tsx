import type { AvailableVaccines } from "@/types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import {
  Select,
  SelectedItems,
  SelectItem,
  SelectSection,
  type Selection,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

type SelectVaccinesProps = {
  vaccinesSelect: AvailableVaccines[];
  isInvalidSelect: boolean;
  setValueSelect: React.Dispatch<React.SetStateAction<number | null>>;
  valueSelect: number | null;
  filterByTipoVacuna?: "medica" | "plan_sanitario" | "ambas";
};

export const SelectVaccines = ({
  vaccinesSelect,
  isInvalidSelect,
  setValueSelect,
  valueSelect,
  filterByTipoVacuna = "ambas",
}: SelectVaccinesProps) => {
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

  useEffect(() => {
    valueSelect == null && setValue(new Set([]));
  }, [valueSelect]);

  const [value, setValue] = useState<Selection>(new Set([]));

  return (
    <Select
      id={"vacuna_id"}
      label={"Vacunas"}
      color={`${isInvalidSelect ? "danger" : "primary"}`}
      isInvalid={isInvalidSelect}
      variant="underlined"
      selectedKeys={value}
      items={filteredVaccines}
      description={"vacunas"}
      onSelectionChange={(keys) => {
        setValue(keys);
        setValueSelect(Number.parseInt(Array.from(keys)[0] as string));
      }}
      classNames={{
        label: "text-current font-bold",
        value: "text-current",
        popoverContent: "bg-base-100",
      }}
      //componente mostrado en el select

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
                      : vaccine.tipos_ganado
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
