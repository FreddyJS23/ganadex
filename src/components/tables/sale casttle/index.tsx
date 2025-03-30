"use client";

import { headerSaleCasttle } from "@/collections/headerColums";
import { Ganado, ResponseVentasGanado, VentaGanado } from "@/types";
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

export const TableSaleCasttle = ({ ventas }: ResponseVentasGanado) => {
  const renderCell = useCallback(
    (venta_ganado: VentaGanado, columnKey: Key) => {
      const cellValue = venta_ganado[columnKey as keyof VentaGanado];

      switch (columnKey as keyof VentaGanado) {
        case "ganado": {
          const ganado = cellValue as Pick<Ganado, "id" | "numero">;
          return <Link href={`ganado/${ganado.id}`}>{ganado.numero}</Link>;
        }

        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <TableComponent
      type="saleCasttle"
      columnsCollection={headerSaleCasttle}
      items={ventas}
      renderCell={renderCell}
    />
  );
};
