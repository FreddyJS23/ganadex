import { ResponseErrorNext } from "@/types";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


/** hook para manejar la edicion y borrado de elementos
 * @param deleteActionResponse Action que se ejecuta para borrar el elemento
 */
export const useEditDelete = (deleteActionResponse:(id:number)=>Promise<string | ResponseErrorNext>) => {
  
    const router = useRouter();

    /* activar el input para editar */
    const [editar, setEditar] = useState(false);
    /* id del elemento que se va a editar, para asi en un map, se pueda saber que elemento se esta editando */
    const [idAction, setIdAction] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    

    const onEdit = (id: number) => {
        setEditar(true);
        setIdAction(id);
    };

    /* el id que se recibe proviene del componente edit-delete, 
    ya que en ese componente el onDelete recibe un parametro id que es el id del elemento que se quiere borrar */
    const onDelete = async (id: number) => {
        setIsLoading(true);

        const response = await deleteActionResponse(id);
        if (typeof response == 'object' && 'error' in response!)
            return toast.error(messageErrorApi(response));
        else {
            setIsLoading(false);
            setEditar(false);
            router.refresh();
        }
    };

    const onSaveOrCancel = () => {
        setEditar(false);
        setIdAction(null);
    };

    
    return { editar,idAction,isLoading,onEdit,onDelete,onSaveOrCancel };
};