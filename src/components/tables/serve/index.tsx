"use client";

import { headerAllServes } from "@/collections/headerColums";
import type {
  ResponseServiciosGeneral,
  Servicios,
  ToroDeServicio,
} from "@/types";
import { type Key, type ReactNode, useCallback } from "react";
import { TableComponent } from "..";
import { RedirectInTable } from "@/components/redirectsInTables";
import { DropDownOptions } from "@/components/dropdowns/dropdown options";

export const TableAllServes = ({
  todos_servicios,
}: ResponseServiciosGeneral) => {
  const renderCell = useCallback((servicios: Servicios, columnKey: Key) => {
    const cellValue = servicios[columnKey as keyof Servicios];
    switch (columnKey as keyof Servicios) {
      case "numero": {
        const numero = cellValue as number;
        return (
          <RedirectInTable
            id={servicios["id"]}
            label={numero ?? ""}
            redirect="ganado"
          />
        );
        break;
      }

      case "pendiente": {
        const pendiente = cellValue as boolean;

        return <span>{pendiente ? "Sí" : "No"}</span>;
      }

      case "toro": {
        const toro = cellValue as ToroDeServicio;

        if (toro)
          return (
            <RedirectInTable
              id={toro.id}
              label={toro.numero ?? ""}
              redirect="toros"
            />
          );
        else if (servicios["pajuela_toro"])
          return (
            <RedirectInTable
              id={servicios["pajuela_toro"].id}
              label={servicios["pajuela_toro"].codigo}
              redirect="toros"
            />
          );
        else return <></>;
        break;
      }

      case "efectividad": {
        const efectividad = cellValue as number;

        return <span>{efectividad ? `${efectividad}%` : ""}</span>;
      }

      case "id": {
        const id = cellValue as number;
        return <DropDownOptions idCattle={id} optionType="serve" />;
      }

      default:
        break;
    }

    return cellValue as ReactNode;
  }, []);

  return (
    <TableComponent
      columnsCollection={headerAllServes}
      items={todos_servicios}
      renderCell={renderCell}
      type="servicio"
    />
  );
};
