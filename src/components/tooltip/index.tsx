import {
  DASHBOARD_SALE,
  DASHBOARD_TOOLTIPS,
  DETAILS_GANADO_TOOLTIPS,
  FORM_TOOLTIPS,
  TABLE_TOOLTIPS,
} from "@/constants/tooltipsMessages";
import Icon from "@/icons/icon-question.svg";
import { TooltipsProps } from "@/types";
import { forwardRef } from "react";
import { Tooltip as TooltipNextUI } from "@nextui-org/react";

const sizes = { sm: "size-4", md: "size-6", lg: "size-8" };

export const Tooltip = forwardRef(function Tooltip(
  props: TooltipsProps & { size?: keyof typeof sizes },
  ref,
) {
  const { content, placement = "top", size = "lg", type } = props;

  //destrucuturas todos los mensajes para llamarlos por una key y no llamar las contantes en cada archivo
  const allMessages = {
    ...DASHBOARD_TOOLTIPS,
    ...DASHBOARD_SALE,
    ...FORM_TOOLTIPS,
    ...DETAILS_GANADO_TOOLTIPS,
    ...TABLE_TOOLTIPS,
  };
  return (
    <>
      {type === "icon" && (
        <TooltipNextUI
          classNames={{ content: "bg-base-100" }}
          content={allMessages[content]}
          placement={placement}
        >
          <span ref={ref}>
            {" "}
            <Icon className={`${sizes[size]} cursor-help`} />
          </span>
        </TooltipNextUI>
      )}
      {type == "text" && (
        <TooltipNextUI
          classNames={{ content: "bg-base-100" }}
          content={allMessages[content]}
          placement={placement}
        >
          {props.children}
        </TooltipNextUI>
      )}
    </>
  );
});

export const TooltipTipoGanado = forwardRef(function TooltipGanado(
  props: { tipo: "vaca" | "toro" },
  ref,
) {
  return (
    <TooltipNextUI
      classNames={{ content: "bg-base-100" }}
      content={
        <div className="px-1 py-2 flex flex-col">
          <div className="text-small font-bold mb-2">Tipos</div>
          <span className="text-xs mb-1">Becerro: Edad entre 0 y 365 días</span>
          <span className="text-xs mb-1">Maute: Edad entre 365 y 729 días</span>
          <span className="text-xs mb-1">Novillo: Edad mayor de 730 días</span>
          {props.tipo == "vaca" && (
            <span className="text-xs mb-1">
              Adulto: Ya tuvo su primer parto
            </span>
          )}
          {props.tipo == "toro" && (
            <span className="text-xs mb-1">Adulto: Ya es un adulto</span>
          )}
        </div>
      }
      placement="left"
    >
      <span ref={ref}>
        <Icon className={`size-4 cursor-help`} />
      </span>
    </TooltipNextUI>
  );
});
