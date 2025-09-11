"use client";

import { headerDeadCattle } from "@/collections/headerColums";
import { Fallecimiento, Ganado, ResponseFallecimientos } from "@/types";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Key, ReactNode, useCallback } from "react";
import { LayoutTable, TableComponent } from "..";
import Link from "next/link";
import { RedirectInTable } from "@/components/redirectsInTables";

export const TableDeadCattle = ({ fallecidos }: ResponseFallecimientos) => {
  const renderCell = useCallback(
    (fallecimiento: Fallecimiento, columnKey: Key) => {
      const cellValue = fallecimiento[columnKey as keyof Fallecimiento];

      switch (columnKey as keyof Fallecimiento) {
        case "ganado": {
          const ganado = cellValue as Pick<Ganado, "id" | "numero">;
          return (
            <RedirectInTable
              id={fallecimiento["id"]}
              label={ganado.numero}
              redirect="ganado"
            />
          );
        }

        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <TableComponent
      type="deadCattle"
      columnsCollection={headerDeadCattle}
      items={fallecidos}
      renderCell={renderCell}
    />
  );
};
