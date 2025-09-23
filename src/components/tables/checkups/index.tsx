"use client";

import { headerAllCheckup } from "@/collections/headerColums";
import type {
  ResponseRevisionesGeneral,
  Revisiones,
  TipoRevision,
} from "@/types";
import { type Key, type ReactNode, useCallback } from "react";
import { TableComponent } from "..";
import { RedirectInTable } from "@/components/redirectsInTables";
import { DropDownOptions } from "@/components/dropdowns/dropdown options";

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
      case "pendiente": {
        const pendiente = cellValue as boolean;

        return <span>{pendiente ? "Sí" : "No"}</span>;
      }

      case "revision": {
        const revision = cellValue as
          | string
          | Pick<TipoRevision, "tipo" | "codigo">;
        //revision desconocido
        if (typeof revision == "string") return <span>{revision}</span>;
        else {
          //diagnositco pero no tiene codigo
          if (!revision.codigo) return <span>{revision.tipo}</span>;
          else
            return (
              <div className="flex flex-col">
                <span className="text-primary font-bold">
                  {revision.codigo}
                </span>
                <span className="">{revision.tipo}</span>
              </div>
            );
        }
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
      type="revisión"
      columnsCollection={headerAllCheckup}
      items={todas_revisiones}
      renderCell={renderCell}
    />
  );
};
    />
  );
};
    />
  );
};
    />
  );
};
