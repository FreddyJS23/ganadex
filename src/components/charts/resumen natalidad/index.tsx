"use client";

import { getResumenNatalidad } from "@/actions/getResumenNatalidad";
import { SelectFilterYear } from "@/components/selects/select filter year";
import type { ResponseErrorNext, ResponseResumenNatalidad } from "@/types";
import { useRef, useState } from "react";
import { TotalNacimientosAñoActualTorta } from "./total doughnut";
import { NatalidadUltimos5AñosBarra } from "./natalidad ultimos años";
import { PartosUltimos5AñosLinea } from "./partos ultimos años";
import type { Chart as ChartJS } from "chart.js";
import { toast } from "sonner";
import IconReport from "@/icons/icono-imprimir.svg";
import { Button, CircularProgress } from "@nextui-org/react";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useThemeStore } from "@/stores/themeStore";

export const ResumenNatalidad = (
  resumenNatalidad: ResponseResumenNatalidad,
) => {
  /* referencia en el dom para guardar el grafico */
  const graficoTorta = useRef<ChartJS<"doughnut">>(null);
  const graficoLineal = useRef<ChartJS<"line">>(null);
  const graficoBarra = useRef<ChartJS<"bar">>(null);

  const { darkMode, activateDarkMode, disableDarkMode } = useThemeStore(
    (state) => state,
  );

  /* estado para mostrar loading y poner opacidad a los gráfico
  cuando se genere un reporte y este en modo oscuro */
  const [hiddenChart, setHiddenChart] = useState(false);

  /* guardas datos provenientes de la api para los graficos */
  const [dataGraph, setDataGraph] = useState(resumenNatalidad);
  /* loader boton generar reporte */
  const [isLoading, setIsLoading] = useState(false);

  /* seleccion del año para el grafico */
  const [selectValue, setSelectValue] = useState(
    Number.parseInt(resumenNatalidad.nacimientos_año_actual.año),
  );

  /* funcion para cambiar el año seleccionado */
  const onChange = async (select: number) => {
    setSelectValue(select);

    const data = await getResumenNatalidad(select);
    if ("error" in data) return toast.error(messageErrorApi(data));

    setDataGraph(data);
  };

  /* funcion para extraer los años de los datos de la api y rellenar el select */
  const extraerAñosResumen = (
    nacimientos_ultimos_5_años: ResponseResumenNatalidad["nacimientos_ultimos_5_año"],
  ) => {
    const years: string[] = [];
    //extraer datos para rellenar grafico
    nacimientos_ultimos_5_años.forEach(({ año }) => {
      years.push(año);
    });
    return { years };
  };

  const generarReporte = async () => {
    /* formdata para enviar las imagenes de los graficos */
    const formData = new FormData();
    //desactivar el modo oscuro para evitar problemas de visualización de los graficos
    if (darkMode) {
      disableDarkMode();
      setHiddenChart(true);
    }
    setIsLoading(true);
    // Esperar un pequeño retraso para que los cambios de estilo se reflejen
    await new Promise((resolve) => setTimeout(resolve, 500));

    /* verificar que los graficos esten cargados  y evitar problema de tipado*/
    if (graficoTorta.current && graficoLineal.current && graficoBarra.current) {
      /* agregar los graficos a la formdata en formato imagen base64 de los canvas */
      formData.append(
        "graficoTorta",
        graficoTorta.current?.canvas.toDataURL("image/png"),
      );
      formData.append(
        "graficoLineal",
        graficoLineal.current?.canvas.toDataURL("image/png"),
      );
      formData.append(
        "graficoBarra",
        graficoBarra.current?.canvas.toDataURL("image/png"),
      );
    }

    const optionFetch: RequestInit = {
      method: "POST",
      body: formData,
    };

    /* fetch al manejador de ruta para enviar las imágenes y obtener el blob del pdf */
    const getFile = await fetch(
      `/api/reporte_natalidad?year=${selectValue}`,
      optionFetch,
    );
    if (getFile.status == 500) {
      const error = (await getFile.json()) as ResponseErrorNext;
      toast.error(error.error.message);
    } else {
      toast.success(`Generando reporte...`);
      const file = await getFile.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(file as Blob);
      link.download = `Reporte_natalidad$ ${selectValue}.pdf`;
      link.click();
    }

    if (darkMode) {
      setHiddenChart(false);
      activateDarkMode();
    }

    setIsLoading(false);
  };

  return (
    <section>
      <div className="flex gap-4">
        <div className="w-40">
          <SelectFilterYear
            onChange={onChange}
            label="Año"
            items={extraerAñosResumen(
              dataGraph.nacimientos_ultimos_5_año,
            ).years.reverse()}
            type="years"
          />
        </div>
        <Button
          isIconOnly
          aria-label="generarReporte"
          variant="flat"
          onClick={() => generarReporte()}
          isLoading={isLoading}
        >
          <IconReport />
        </Button>
      </div>

      {/* gráficos */}

      <div className=" flex flex-col m-auto w-full gap-4 ">
        <div className="m-auto bg-base-100 shadow-cards w-full max-w-md relative">
          {isLoading && hiddenChart && <Loading />}
          <div className={`${isLoading && hiddenChart ? "opacity-10" : ""}`}>
            <TotalNacimientosAñoActualTorta
              ref={graficoTorta}
              nacimientos_año_actual={dataGraph.nacimientos_año_actual}
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="w-full p-2 max-w-3xl bg-base-100 shadow-cards relative">
            {isLoading && hiddenChart && <Loading />}
            <div className={`${isLoading && hiddenChart ? "opacity-10" : ""}`}>
              <NatalidadUltimos5AñosBarra
                ref={graficoBarra}
                nacimientos_ultimos_5_año={dataGraph.nacimientos_ultimos_5_año}
              />
            </div>
          </div>

          <div className="w-full p-2 max-w-3xl bg-base-100 shadow-cards relative">
            {isLoading && hiddenChart && <Loading />}
            <div className={`${isLoading && hiddenChart ? "opacity-10" : ""}`}>
              <PartosUltimos5AñosLinea
                ref={graficoLineal}
                nacimientos_ultimos_5_año={dataGraph.nacimientos_ultimos_5_año}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Loading = () => {
  return (
    <div className="absolute inset-0 m-auto w-fit h-fit">
      <CircularProgress size={"lg"} />
    </div>
  );
};
