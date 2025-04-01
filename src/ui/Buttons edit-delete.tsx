import { Button, ButtonProps } from "@nextui-org/react";
import IconEdit from "@/icons/icono-editar.svg";
import IconDelete from "@/icons/icono-borrar.svg";
import IconSave from "@/icons/icono-save.svg";
import IconCancel from "@/icons/icono-error.svg";
import { useFormStatus } from "react-dom";
import { useEditDelete } from "@/lib/hooks/useEditDelete";

type ButtonEditProps = {
  id: number;
  size?: "sm" | "md" | "lg"
  /**Desabilitar el boton de eliminacion ya que hay elementos no deben ser eliminados   */
  hiddenDelete?: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
  state: "edit" | "save";
  formId: string;
  onCancel: () => void;
};




export const ButtonsEditedDelete = ({formId,state,id,size,hiddenDelete=false,onEdit,onDelete,isLoading,onCancel}:ButtonEditProps) => {

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
          form={formId}
          isLoading={pending ? pending : isLoading}
        >
          <IconSave className="size-7" />
        </Button>
      ) : (
        /* edit */
        <Button
          {...baseButtonProps("Editar")}
          onClick={() => onEdit(id)}
          isLoading={isLoading}
        >
          <IconEdit className="size-6" />
        </Button>
      )}

      {state == "save" ? (
        /* cancel */
        <Button
          {...baseButtonProps("Cancelar")}
          onClick={onCancel}
        >
          <IconCancel className="size-7 fill-white" />
        </Button>
      ) : (
        /* delete */
       !hiddenDelete && <Button
          {...baseButtonProps("Eliminar")}
          onPress={() => onDelete(id)}
          isLoading={isLoading}
          className="bg-error"
        >
          <IconDelete className="size-7" />
        </Button>
      )}
    </div>
  );
};
