import { deleteHacienda, editHacienda } from "@/actions/hacienda";
import { ChangeSessionHacienda } from "@/components/change session hacienda";
import { Input } from "@/components/Inputs";
import { ElementProfile } from "@/components/tabs/tabs profile/items";
import { useEditDelete } from "@/hooks/useEditDelete";
import type { Hacienda, UserLoginInfo } from "@/types";
import type { CreateHacienda } from "@/types/forms";
import { ButtonsEditedDelete } from "@/ui/Buttons edit-delete";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { createHaciendaShema } from "@/validations/hacienda";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type ReactNode, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  const { stateButton, idAction, isLoading, onEdit, onSaveOrCancel, onDelete } =
    useEditDelete(deleteHacienda);

  return haciendas.map((hacienda) => {
    return stateButton == "save" && idAction == hacienda.id ? (
      /*Editar hacienda */
      <div className="flex gap-2 items-center">
        <Edit hacienda={hacienda} id={hacienda.id} onSave={onSaveOrCancel}>
          <ButtonsEditedDelete
            id={hacienda.id}
            isLoading={isLoading}
            onEdit={onEdit}
            onDelete={onDelete}
            onCancel={onSaveOrCancel}
            formId="form-edit-hacienda"
            state="save"
          />
        </Edit>
      </div>
    ) : (
      /* Ver hacienda */
      <ElementProfile
        key={hacienda.id}
        tittle={hacienda.nombre}
        titleOptions={
          userLoginInfo.rol == "admin" && haciendaSesion.id != hacienda.id ? (
            <ButtonsEditedDelete
              id={hacienda.id}
              state="edit"
              formId="form-edit-hacienda"
              onCancel={onSaveOrCancel}
              isLoading={isLoading}
              onEdit={onEdit}
              onDelete={onDelete}
              size="sm"
            />
          ) : undefined
        }
        description={`Creada el ${hacienda.fecha_creacion}`}
      >
        {haciendaSesion.id != hacienda.id ? (
          <ChangeSessionHacienda hacienda={hacienda} />
        ) : undefined}
      </ElementProfile>
    );
  });
};
const Edit = ({
  hacienda,
  id,
  onSave,
  children,
}: {
  hacienda: Hacienda;
  id: number;
  onSave: () => void;
  children: ReactNode;
}) => {
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

    /* manejar error del backend y mostrar mensaje */
    if (typeof hacienda == "object" && "error" in hacienda)
      return toast.error(messageErrorApi(hacienda));

    toast.success(`Se ha actualizado correctamente`);
    formRef.current?.reset();
    router.refresh();
    onSave();
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
          id="nombre"
          required
          type="text"
          label="Hacienda"
          register={register}
          errors={errors}
          defaultValue={hacienda.nombre}
        />
      </div>
      {children}
    </form>
  );
};
