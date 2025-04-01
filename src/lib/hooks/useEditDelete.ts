import { ResponseErrorNext } from "@/types";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/** hook para manejar la edicion y borrado de elementos
 * @param deleteActionResponse Action que se ejecuta para borrar el elemento
 */
export const useEditDelete = (
  deleteActionResponse?: (id: number) => Promise<string | ResponseErrorNext>,
) => {
  const router = useRouter();

  /* activar el input para editar */
  const [stateButton, setStateButton] = useState<'edit' | 'save'>('edit');
  /* id del elemento que se va a editar, para asi en un map, se pueda saber que elemento se esta editando */
  const [idAction, setIdAction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onEdit = (id: number) => {
    setIsLoading(true);
   
    /* se usa timeout para evitar doble click en el boton, ya al hacer click en el boton edit, tambien se hace click en save */
    setTimeout(() => {
      setStateButton('save');
    }, 300);
    setIdAction(id);
    setIsLoading(false);
  };

  /* el id que se recibe proviene del componente edit-delete, 
    ya que en ese componente el onDelete recibe un parametro id que es el id del elemento que se quiere borrar */
  const onDelete = async (id: number) => {
    setIsLoading(true);

    const response = deleteActionResponse
      ? await deleteActionResponse(id)
      : undefined;
    if (typeof response == "object" && "error" in response!) {
      setIsLoading(false);
      setStateButton('edit');
      return toast.error(messageErrorApi(response));
    } else {
      setIsLoading(false);
      setStateButton('edit');
      router.refresh();
      return toast.success(`Se ha eliminado correctamente`);
    }
  };

  const onSaveOrCancel = () => {
    setStateButton('edit');
    setIdAction(null);
  };

  return { stateButton, idAction, isLoading,setIsLoading, onEdit, onDelete, onSaveOrCancel };
};
