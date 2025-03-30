"use client";

import { headerAllCheckup } from "@/collections/headerColums";
import { ResponseRevisionesGeneral, Revisiones } from "@/types";
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
      case "id": {
        const id = cellValue as number;
        return <DropDownOptions idCattle={id} optionType="checkup" />;
      }

      default:
        break;
    }

    return cellValue as ReactNode;
  }, []);

  return (
    <TableComponent
      type="checkups"
      columnsCollection={headerAllCheckup}
      items={todas_revisiones}
      renderCell={renderCell}
    />
  );
};
