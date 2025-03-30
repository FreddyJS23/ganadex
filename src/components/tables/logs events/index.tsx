"use client";

import { headersColumnsLogEventos } from "@/collections/headerColums";
import { LogEvento, ResponseLogEventos } from "@/types";
import { Key, ReactNode, useCallback } from "react";
import { TableComponent } from "..";
import { Tooltip } from "@/components/tooltip";

export const TableLogsEvents = ({ logs_eventos }: ResponseLogEventos) => {
  const renderCell = useCallback((logEvento: LogEvento, columnKey: Key) => {
    const cellValue = logEvento[columnKey as keyof LogEvento];
    switch (columnKey as keyof LogEvento) {
      default:
        return cellValue as ReactNode;
    }
  }, []);

  return (
    <>
      <Tooltip type="icon" content="logs_eventos" />
      <TableComponent
        type="logs eventos"
        columnsCollection={headersColumnsLogEventos}
        items={logs_eventos}
        renderCell={renderCell}
      />
    </>
  );
};
