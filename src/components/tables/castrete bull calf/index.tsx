"use client";

import { headerCastreteBullCalf } from "@/collections/headerColums";
import { CriaPendienteCapar, ResponseCriasPendienteCapar } from "@/types";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Key, ReactNode, useCallback } from "react";
import { LayoutTable, TableComponent } from "..";
import IconButton from "@/icons/icono-capar-numeracion.svg";
import Link from "next/link";

export const TableCastreteBullCalf = ({
  crias_pendiente_capar,
}: ResponseCriasPendienteCapar) => {
  const renderCell = useCallback(
    (criaPendienteCapar: CriaPendienteCapar, columnKey: Key) => {
      const cellValue =
        criaPendienteCapar[columnKey as keyof CriaPendienteCapar];

      switch (columnKey as keyof CriaPendienteCapar) {
        case "nombre": {
          const nombre = cellValue as string;
          return (
            <Link href={`ganado/${criaPendienteCapar["id"]}`}>{nombre}</Link>
          );
        }
        /* button icon */
        case "id": {
          const id = cellValue as number;
          return (
            <Link href={`capar_becerro/${id}`}>
              <IconButton className={"size-6"} />
            </Link>
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
      type="castreteBullCalf"
      columnsCollection={headerCastreteBullCalf}
      items={crias_pendiente_capar}
      renderCell={renderCell}
    />
  );
};
