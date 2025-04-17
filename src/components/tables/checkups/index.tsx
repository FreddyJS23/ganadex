"use client";

import { headerAllCheckup } from "@/collections/headerColums";
import { ResponseRevisionesGeneral, Revisiones, TipoRevision } from "@/types";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Key, ReactNode, useCallback } from "react";
import { LayoutTable, TableComponent } from "..";
import { RedirectInTable } from "@/components/redirectsInTables";
import { DropDownOptions } from "@/components/dropdown options";

export const TableAllCheckups = ({
  todas_revisiones,
}: ResponseRevisionesGeneral) => {
  const renderCell = useCallback((revisiones: Revisiones, columnKey: Key) => {
    const cellValue = revisiones[columnKey as keyof Revisiones];
    switch (columnKey as keyof Revisiones) {
      case "numero": {
        const numero = cellValue as number;
        return (
          <RedirectInTable
            id={revisiones["id"]}
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

      case "diagnostico": {
        const diagnostico = cellValue as
          | string
          | Pick<TipoRevision, "tipo" | "codigo">;
        //diagnostico desconocido  ola
        if (typeof diagnostico == "string") return <span>{diagnostico}</span>;
        else {
          //diagnositco pero no tiene codigo
          if (!diagnostico.codigo) return <span>{diagnostico.tipo}</span>;
          else
            return (
              <div className="flex flex-col">
                <span className="text-primary font-bold">
                  {diagnostico.codigo}
                </span>
                <span className="">{diagnostico.tipo}</span>
              </div>
            );
        }
      }

      case "id": {
        const id = cellValue as number;
        return <DropDownOptions idCattle={id} optionType="checkup" />;
      }

      default:
        break;
    }

    return cellValue as ReactNode;
  }, []);
console.log(todas_revisiones);
  return (
    <TableComponent
      type="revision"
      columnsCollection={headerAllCheckup}
      items={todas_revisiones}
      renderCell={renderCell}
    />
  );
};
