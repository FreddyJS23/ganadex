"use client";

import IconImprimir from "@/icons/icono-imprimir.svg";
import IconGrafico from "@/icons/icono-grafico.svg";
import { toast } from "sonner";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Button as ButtonNextUI } from "@nextui-org/react";

type GenerateReport = {
  endPoint: "ganado" | "dashboard";
  id?: number;
};

export const ButtonGenerateReport = () => {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const generateReport = async (
    endPoint: GenerateReport["endPoint"],
    id?: number,
  ) => {
    try {
      setLoading(true);
      const getFile = await fetch(
        `/api/reportes/${endPoint}${id ? `?id=${id}` : ""}  `,
      );
      toast.success(`Generando reporte...`);
      const file = await getFile.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(file as Blob);
      link.download = `Reporte_${endPoint}.pdf`;
      link.click();
    } catch (error) {
      const message = error as string;
      return toast.error(message);
    }
    finally {
      setLoading(false);
    }
  };

  const Button = ({ endPoint, id }: GenerateReport) => {
    return (
     
      <ButtonNextUI
      isIconOnly
      title={`Generar reporte`}
      aria-label="Guardar"
      variant="flat"
      size="sm"
      isLoading={loading}
      onClick={() => generateReport(endPoint, id)}
    >
      <IconImprimir className={"size-8"} />
    </ButtonNextUI>
    
    );
  };

  /* reportes directos sin necesidad de un modal previo */
  if (pathname == `/ganado/${id}`)
    return <Button endPoint={"ganado"} id={parseInt(id)} />;
  else if (pathname == "/dashboard") return <Button endPoint={"dashboard"} />;
  /*reportes con la necesidad de un modal previo */ else if (
    pathname == "/venta_leche"
  )
    return (
      <Link href={`/reporte/venta_leche`}>
        <IconImprimir tittle="Generar reporte" className={"text-base-100 size-8 sm:text-current"} />
      </Link>
    );
  else if (pathname == "/fallecimientos")
    return (
      <Link href={`/reporte/causas_fallecimientos`}>
        <IconImprimir tittle="Generar reporte" className={"text-base-100 size-8 sm:text-current"} />
      </Link>
    );
  else if (pathname == "/venta_ganado/historial")
    return (
      <Link href={`/reporte_anual/venta_ganado`}>
        <IconImprimir tittle="Generar reporte" className={"text-base-100 size-8 sm:text-current"} />
      </Link>
    );
  else if (pathname == "/partos")
    return (
      <Link href={`/partos/resumen`}>
        <IconGrafico tittle="Ver resumen estadístico" className={"text-base-100 size-8 sm:text-current"} />
      </Link>
    );

  return <></>;
};
