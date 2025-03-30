"use client";

import { headerPajuelaToro } from "@/collections/headerColums";
import { PajuelaToro, ResponsePajuelaToros } from "@/types";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Key, ReactNode, useCallback } from "react";
import { LayoutTable, TableComponent } from "..";

export const TablePajuelaToro = ({ pajuela_toros }: ResponsePajuelaToros) => {
  const renderCell = useCallback((toro: PajuelaToro, columnKey: Key) => {
    const cellValue = toro[columnKey as keyof PajuelaToro];

    switch (columnKey as keyof PajuelaToro) {
      default:
        return cellValue as ReactNode;
    }
  }, []);

  return (
    <TableComponent
      type="pajuelaToro"
      columnsCollection={headerPajuelaToro}
      items={pajuela_toros}
      renderCell={renderCell}
    />
  );
};
