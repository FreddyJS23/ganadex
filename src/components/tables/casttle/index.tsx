"use client";

import { headerCasttle } from "@/collections/headerColums";
import {
  CabezasGanado,
  EstadosGanado,
  Pesos,
  ResponseGanados,
  User,
} from "@/types";
import { getAge } from "@/utils/getAge";
import { Key, ReactNode, useCallback,  } from "react";
import {  TableComponent } from "..";
import { DropdownStatesCattle } from "@/components/dropdown states cattle";
import { DropDownOptions } from "@/components/dropdown options";
import { RedirectInTable } from "@/components/redirectsInTables";
import IconCheck from "@/icons/icono-check.svg";

export const TableCasttle = ({
  cabezas_ganado,
  role,
}: ResponseGanados & { role: User["rol"] }) => {
  const renderCell = useCallback(
    (cabeza_ganado: CabezasGanado, columnKey: Key) => {
      const cellValue = cabeza_ganado[columnKey as keyof CabezasGanado];

      switch (columnKey as keyof CabezasGanado) {
        case "numero": {
          const numero = cellValue as number;
          return (
            <RedirectInTable
              id={cabeza_ganado["id"]}
              label={numero}
              redirect="ganado"
            />
          );
        }
        case "pesos": {
          const pesos = cellValue as Pesos;

          return (
            <div>
              {pesos
                ? pesos.peso_actual
                  ? pesos.peso_actual
                  : "desconocido"
                : "desconocido"}
            </div>
          );
        }

        case "estados": {
          const estados = cellValue as EstadosGanado[];

          return <DropdownStatesCattle estados={estados} />;
        }

        case "fecha_nacimiento": {
          const fecha_nacimiento = cellValue as string;
          return <div>{getAge(fecha_nacimiento)}</div>;
        }

        case "id": {
          const id = cellValue as number;
          const estados = cabeza_ganado["estados"] as EstadosGanado[];

          return !estados.some(
            ({ estado }) => estado == "fallecido" || estado == "vendido",
          ) ? (
            <DropDownOptions idCattle={id} optionType="cattle" role={role} />
          ) : (
            <IconCheck className={"size-8"} />
          );
        }

        default:
          return cellValue as ReactNode;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <TableComponent
      columnsCollection={headerCasttle}
      items={cabezas_ganado}
      renderCell={renderCell}
      type="cattle"
    />
  );
};
