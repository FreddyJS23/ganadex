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
import { Key, ReactNode, useCallback, useState } from "react";
import { LayoutTable, TableComponent } from "..";
import Link from "next/link";
import { toast } from "sonner";
import IconPrint from "@/icons/icono-imprimir.svg";
import { Button } from "@nextui-org/react";

export const TableSaleCasttle = ({ ventas }: ResponseVentasGanado) => {
  const renderCell = useCallback(
    (venta_ganado: VentaGanado, columnKey: Key) => {
      const cellValue = venta_ganado[columnKey as keyof VentaGanado];

      switch (columnKey as keyof VentaGanado) {
        case "ganado": {
          const ganado = cellValue as Pick<Ganado, "id" | "numero">;
          return <Link href={`ganado/${ganado.id}`}>{ganado.numero}</Link>;
        }

        case "id": {
          const id = cellValue as number;
          return <ButtonPrintReport id={id} />;
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

const ButtonPrintReport = ({ id }: { id: number }) => {
  const generateReportSale = async (number: number) => {
    try {
      setLoading(true);
      const getFile = await fetch(`/api/reportes/notaVenta?id=${number}`);
      toast.success(`Generando nota de venta...`);
      const file = await getFile.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(file as Blob);
      link.download = `Reporte_nota_venta_animal_${number}.pdf`;
      link.click();
    } catch (error) {
      const message = error as string;
      return toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-24">
      <Button
        isIconOnly
        title={`Imprimir reporte`}
        aria-label="Guardar"
        variant="flat"
        size="sm"
        isLoading={loading}
        onClick={async () => await generateReportSale(id)}
      >
        <IconPrint className={"size-6"} />
      </Button>
    </div>
  );
};
