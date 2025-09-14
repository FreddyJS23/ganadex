"use client";

import { headersColumnsLogsVeterinary } from "@/collections/headerColums";
import { LogVeterinary, ResponseLogsVeterinary } from "@/types";
import { Key, ReactNode, useCallback } from "react";
import { TableComponent } from "..";

export const TableLogsVeterinary = ({ logs }: ResponseLogsVeterinary) => {
  const renderCell = useCallback(
    (logVeterinary: LogVeterinary, columnKey: Key) => {
      const cellValue = logVeterinary[columnKey as keyof LogVeterinary];
      switch (columnKey as keyof LogVeterinary) {
        /* button icon */
        case "actividad_id": {
          return (
            /*  <Link title={'Ir a la actividad'} >
                            <IconSearch className={'size-8 cursor-pointer '} />
                        </Link> */
            <div>test</div>
          );
        }

        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <>
      <TableComponent
        type="logs veterinary"
        columnsCollection={headersColumnsLogsVeterinary}
        items={logs}
        renderCell={renderCell}
      />
    </>
  );
};
