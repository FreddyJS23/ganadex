"use client";

import { headerPlanesSanitario } from "@/collections/headerColums";
import { DayVaccination, ResponsePlanesSanitario } from "@/types";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Key, ReactNode, useCallback } from "react";
import { LayoutTable, TableComponent } from "..";

export const TableVAccinationDay = ({
  planes_sanitario,
}: ResponsePlanesSanitario) => {
  const renderCell = useCallback(
    (planSanitario: DayVaccination, columnKey: Key) => {
      const cellValue = planSanitario[columnKey as keyof DayVaccination];

      switch (columnKey as keyof DayVaccination) {
        case "ganado_vacunado": {
          const ganado_vacunado = cellValue as string;
          return <span>{ganado_vacunado}</span>;
        }
        default:
          break;
      }

      return cellValue as ReactNode;
    },
    [],
  );

  return (
    <TableComponent
      type="vaccinationDay"
      columnsCollection={headerPlanesSanitario}
      items={planes_sanitario}
      renderCell={renderCell}
    />
  );
};
