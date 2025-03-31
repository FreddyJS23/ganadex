import { Button, ButtonProps } from "@nextui-org/react";
import IconEdit from "@/icons/icono-editar.svg";
import IconDelete from "@/icons/icono-borrar.svg";
import IconSave from "@/icons/icono-save.svg";
import IconCancel from "@/icons/icono-error.svg";
import { useFormStatus } from "react-dom";

type BaseProps = {
  id: number;
  size?: "sm" | "md" | "lg";
};

type EditProps = BaseProps & {
  state: "edit";
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
};

/* no se utilizar un onSave porque se usa el formId para enviar el formulario */
type SaveProps = BaseProps & {
  state: "save";
  formId: string;
  onCancel: () => void;
};

export const ButtonsEditedDelete = (props: EditProps | SaveProps) => {
  const { id, size, state } = props;

  const { pending } = useFormStatus();
  /* se utilizar el variant para evitar error de tipo al destructurar las props
    ya que si pone flat el tipo sera string y sera incompatible con el variant de nextui */
  const variant:
    | "flat"
    | "bordered"
    | "solid"
    | "light"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined = "flat";

  const baseButtonProps = (action: string) => ({
    isIconOnly: true,
    variant: variant,
    size: size,
    "aria-label": action,
    title: action,
  });

  return (
    <div className="flex gap-4">
      {state == "save" ? (
        /* save */
        <Button
          {...baseButtonProps("Guardar")}
          type="submit"
          form={props.formId}
          isLoading={pending}
        >
          <IconSave className="size-7" />
        </Button>
      ) : (
        /* edit */
        <Button
          {...baseButtonProps("Editar")}
          onClick={() => props.onEdit(id)}
          isLoading={pending}
        >
          <IconEdit className="size-6" />
        </Button>
      )}

      {state == "save" ? (
        /* cancel */
        <Button
          {...baseButtonProps("Cancelar")}
          onClick={props.onCancel}
        >
          <IconCancel className="size-7 fill-white" />
        </Button>
      ) : (
        /* delete */
        <Button
          {...baseButtonProps("Eliminar")}
          onClick={() => props.onDelete(id)}
          isLoading={props.isLoading}
          className="bg-error"
        >
          <IconDelete className="size-7" />
        </Button>
      )}
    </div>
  );
};
