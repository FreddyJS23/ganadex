"use client";

import { headerAssignmentNumberBullCalf } from "@/collections/headerColums";
import {
  CriaPendienteNumeracion,
  ResponseCriasPendienteNumeracion,
} from "@/types";
import { Key, ReactNode, useCallback } from "react";
import { TableComponent } from "..";
import IconButton from "@/icons/icono-capar-numeracion.svg";
import Link from "next/link";

export const TableAssignmentNumberBullCalf = ({
  crias_pendiente_numeracion,
}: ResponseCriasPendienteNumeracion) => {
  const renderCell = useCallback(
    (criaPendienteNumeracion: CriaPendienteNumeracion, columnKey: Key) => {
      const cellValue =
        criaPendienteNumeracion[columnKey as keyof CriaPendienteNumeracion];

      switch (columnKey as keyof CriaPendienteNumeracion) {
        case "nombre": {
          const nombre = cellValue as string;
          return (
            <Link href={`ganado/${criaPendienteNumeracion["id"]}`}>
              {nombre}
            </Link>
          );
        }
        /* button icon */
        case "id": {
          const id = cellValue as number;
          return (
            <Link href={`asignar_numero/${id}`}>
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
      columnsCollection={headerAssignmentNumberBullCalf}
      items={crias_pendiente_numeracion}
      renderCell={renderCell}
      type="assignmente number bull calf"
    />
  );
};
