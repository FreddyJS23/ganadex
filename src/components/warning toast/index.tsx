"use client";

import { useCallback, useEffect } from "react";
import { toast as sonnerToast } from "sonner";
import IconWarning from "@/icons/icono-advertencia.svg";
import IconClose from "@/icons/icono-cerrar-notificacion.svg";

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
}

/* llamar toast custom para que no se repiten las propiedades */
function toast(toast: ToastProps) {
  return sonnerToast.custom(
    (id) => (
      <Toast
        id={id}
        title={toast.title}
        description={toast.description}
        button={{
          label: toast.button.label,
        }}
      />
    ),
    {
      duration: Infinity,
      /* se usa un id manual ya que el effect se ejecuta dos veces, entonces en teoría crearía dos id
        dando como resultado que se ejecuten dos toasts, que no es lo deseado */
      id: toast.title,
    },
  );
}

/* componente toast */
function Toast(props: ToastProps) {
  const { title, description, id } = props;

  return (
    <div
      role="alert"
      className="flex flex-col gap-1 rounded-lg p-3 bg-[#fff9eb] shadow-lg border-4 border-[#ffc24a]"
    >
      {/* header */}
      <div className="flex w-full justify-between ">
        <div className="flex items-center gap-1 ">
          <IconWarning className="size-7" />
          <h3 className="font-bold text-[#dd6002]">{title}</h3>
        </div>

        <IconClose
          onClick={() => sonnerToast.dismiss(id)}
          className="size-6 text-black/60 cursor-pointer "
        />
      </div>

      <div className="text-sm text-balance text-[#dd6002]">{description}</div>
    </div>
  );
}

type WarningToastProps = {
  title: string;
  description: string;
  warning: boolean;
  type: "plan_sanitario" | "preguntas_seguridad";
};

export function WarningToast({
  title,
  description,
  warning,
}: WarningToastProps) {
  const sonner = useCallback(() => {
    toast({
      id: "warning",
      title: title,
      description: description,
      button: {
        label: "",
        onClick: () => sonnerToast.dismiss(),
      },
    });
  }, [title, description]);

  useEffect(() => {
    warning ? sonner() :
    sonnerToast.dismiss();;
  }, [sonner, warning]);

  return <></>;
}
