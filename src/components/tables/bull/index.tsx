"use client";

import { headerBull } from "@/collections/headerColums";
import { EstadosGanado, Pesos, ResponseToros, Toro, User } from "@/types";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Key, ReactNode, useCallback, useState } from "react";
import { LayoutTable, TableComponent } from "..";
import Link from "next/link";
import { RedirectInTable } from "@/components/redirectsInTables";
import { DropDownOptions } from "@/components/dropdown options";
import { DropdownStatesCattle } from "@/components/dropdown states cattle";
import IconCheck from "@/icons/icono-check.svg";
import { ButtonFilterStateCattle } from "@/components/filter state cattle";

export const TableBull = ({
  toros,
  role,
}: ResponseToros & { role: User["rol"] }) => {
  const renderCell = useCallback((toro: Toro, columnKey: Key) => {
    const cellValue = toro[columnKey as keyof Toro];

    switch (columnKey as keyof Toro) {
      case "numero": {
        const numero = cellValue as number;
        return (
          <RedirectInTable id={toro["id"]} label={numero} redirect="toros" />
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

      case "efectividad": {
        const efectividad = cellValue as number;

        return <span>{efectividad ? `${efectividad}%` : ""}</span>;
      }

      case "id": {
        const id = toro["ganado_id"];
        const estados = toro["estados"] as EstadosGanado[];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableComponent
      type="bull"
      columnsCollection={headerBull}
      items={toros}
      renderCell={renderCell}
    />
  );
};
