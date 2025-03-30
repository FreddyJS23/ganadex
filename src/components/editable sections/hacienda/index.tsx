import { deleteHacienda, editHacienda } from '@/actions/hacienda';
import { ChangeSessionHacienda } from '@/components/change session hacienda';
import { Input } from '@/components/Inputs';
import { ElementProfile } from '@/components/tabs profile/items';
import { useEditDelete } from '@/lib/hooks/useEditDelete';
import { Hacienda, UserLoginInfo } from '@/types';
import { CreateHacienda } from '@/types/forms';
import { ButtonsEditedDelete } from '@/ui/Buttons edit-delete';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';
import { createHaciendaShema } from '@/validations/hacienda';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ListHaciendasProfileProps = {
    haciendas: Hacienda[];
    haciendaSesion: Hacienda;
    userLoginInfo: UserLoginInfo;
};

export const ListHaciendasProfile = ({
    haciendas,
    haciendaSesion,
    userLoginInfo,
}: ListHaciendasProfileProps) => {
    const { editar, idAction, isLoading, onEdit, onSaveOrCancel,onDelete } =
        useEditDelete(deleteHacienda);

    return (haciendas.map((hacienda) => {

         return   editar &&
            idAction == hacienda.id 
           ? (
                <div className="flex gap-2 items-center">
                    <Edit hacienda={hacienda} id={hacienda.id} />
                    <ButtonsEditedDelete
                        id={hacienda.id}
                        formId="form-edit-hacienda"
                        state="save"
                        onCancel={onSaveOrCancel}
                        isLoading={isLoading}

                    />
                </div>
            ) : (
                  <ElementProfile
                      key={hacienda.id}
                      tittle={hacienda.nombre}
                      titleOptions={ userLoginInfo.rol == 'admin' &&
                        haciendaSesion.id != hacienda.id ? (
                        <ButtonsEditedDelete
                            id={hacienda.id}
                            state="edit"
                            onEdit={onEdit}
                            onDelete={onDelete}
                            isLoading={isLoading}
                            size='sm'
                        />) : undefined}
                      description={`Creada el ${hacienda.fecha_creacion}`}
                  >
                      {haciendaSesion.id != hacienda.id ? (
                          <ChangeSessionHacienda hacienda={hacienda} />
                      ) : undefined}
                  </ElementProfile>
                 
              
          );
    }))
};
const Edit = ({ hacienda, id }: { hacienda: Hacienda; id: number }) => {
    const router = useRouter();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateHacienda>({
        resolver: zodResolver(createHaciendaShema),
        defaultValues: { nombre: hacienda.nombre },
    });

    const formRef = useRef<HTMLFormElement | null>(null);

    const actionEdit: () => void = handleSubmit(async (data) => {
        const hacienda = await editHacienda(id, data);

        /* manejar error del backedn y mostar mensaje */
        if (typeof hacienda == 'object' && 'error' in hacienda)
            return toast.error(messageErrorApi(hacienda));

        toast.success(`Se ha actualizado correctamente`);
        formRef.current?.reset();
        router.refresh();
    });

    return (
        <form
            className="flex pb-4 px-8 sm:p-2 "
            action={actionEdit}
            ref={formRef}
            id={`form-edit-hacienda`}
        >
                <div className="sm:max-w-64 sm:w-60">
                    <Input
                        id="hacienda"
                        required
                        type="text"
                        label="Hacienda"
                        register={register}
                        errors={errors}
                        defaultValue={hacienda.nombre}
                    />
            </div>
        </form>
    );
};
