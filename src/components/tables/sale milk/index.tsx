"use client";

import { headerSaleMilk } from "@/collections/headerColums";
import { ResponseVentasLeche, VentaLeche } from "@/types";
import { Key, ReactNode, useCallback } from "react";
import { TableComponent } from "..";

export const TableSaleMilk = ({ ventas_de_leche }: ResponseVentasLeche) => {
  const renderCell = useCallback((venta_ganado: VentaLeche, columnKey: Key) => {
    const cellValue = venta_ganado[columnKey as keyof VentaLeche];

    return cellValue as ReactNode;
  }, []);

  return (
    <TableComponent
      type="saleMilk"
      columnsCollection={headerSaleMilk}
      items={ventas_de_leche}
      renderCell={renderCell}
    />
  );
};
