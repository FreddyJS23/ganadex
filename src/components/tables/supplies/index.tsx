"use client";

import { headerSupplies } from "@/collections/headerColums";
import { Insumo, ResponseInsumos } from "@/types";
import { Key, ReactNode, useCallback } from "react";
import { TableComponent } from "..";

export const TableSupplies = ({ insumos }: ResponseInsumos) => {
  const renderCell = useCallback((insumo: Insumo, columnKey: Key) => {
    const cellValue = insumo[columnKey as keyof Insumo];

    return cellValue as ReactNode;
  }, []);

  return (
    <TableComponent
      type="supplies"
      columnsCollection={headerSupplies}
      items={insumos}
      renderCell={renderCell}
    />
  );
};
