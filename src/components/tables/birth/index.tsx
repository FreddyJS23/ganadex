"use client";

import { headerAllBirths } from "@/collections/headerColums";
import type {
  Cria,
  Partos,
  ResponsePartosGeneral,
  ToroDeServicio,
} from "@/types";

import { type Key, type ReactNode, useCallback } from "react";
import { TableComponent } from "..";
import { RedirectInTable } from "@/components/redirectsInTables";
import { DropDownOptions } from "@/components/dropdowns/dropdown options";

export const TableAllBirths = ({ todos_partos }: ResponsePartosGeneral) => {
  const renderCell = useCallback((partos: Partos, columnKey: Key) => {
    const cellValue = partos[columnKey as keyof Partos];
    switch (columnKey as keyof Partos) {
      case "cria": {
        const cria = cellValue as Cria;

        return (
          cria && (
            <RedirectInTable
              id={cria.id}
              label={cria.numero ?? ""}
              redirect="ganado"
            />
          )
        );

        break;
      }
      case "numero": {
        const numero = cellValue as number;
        return (
          <RedirectInTable
            id={partos["id"]}
            label={numero ?? ""}
            redirect="ganado"
          />
        );
        break;
      }
      case "toro": {
        const toro = cellValue as ToroDeServicio;

        if (toro)
          return (
            <RedirectInTable
              id={toro.id}
              label={toro.numero ?? ""}
              redirect="toros"
            />
          );
        else if (partos["pajuela_toro"])
          return (
            <RedirectInTable
              id={partos["pajuela_toro"]!.id}
              label={partos["pajuela_toro"]!.codigo}
              redirect="toros"
            />
          );
        break;
      }
      case "id": {
        const id = cellValue as number;
        return <DropDownOptions idCattle={id} optionType="birth" />;
      }

      default:
        break;
    }

    return cellValue as ReactNode;
  }, []);
  return (
    <TableComponent
      columnsCollection={headerAllBirths}
      items={todos_partos}
      renderCell={renderCell}
      type="parto"
    />
  );
};
type = "parto"
  />
  );
};
type = "parto"
  />
  );
};
type = "parto"
  />
  );
};
