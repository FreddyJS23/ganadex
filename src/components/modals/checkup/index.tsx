"use client";

import { useDisclosure } from "@nextui-org/modal";
import { LayoutModal } from "..";
import { LayoutModalProps, Revision, TipoRevision, veterinario } from "@/types";
import { ButtonsEditedDelete } from "@/ui/Buttons edit-delete";
import { useEditDelete } from "@/lib/hooks/useEditDelete";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { EditCheckUp } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCheckUpShema } from "@/validations/checkUpShema";
import { useForm } from "react-hook-form";
import { editCheckUp } from "@/actions/revision";
import { toast } from "sonner";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { Input } from "@/components/Inputs";

type ModalProps = Pick<
  LayoutModalProps,
  "isOpen" | "onOpen" | "onOpenChange" | "onClose"
> & {
  revision: Revision;

};

export const ModalCheckUp = ({ revision }: ModalProps) => {
  const { onOpen, onOpenChange } = useDisclosure();

  const { stateButton, onEdit, onDelete, isLoading,setIsLoading, onSaveOrCancel } =
    useEditDelete();

  return (
    <LayoutModal
      icon="checkUp"
      titleModal={"Revision del "}
      footer={false}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      dataHeader={typeof revision.fecha == "string" ? revision.fecha : ""}
    >
      <>
        {/* diagnosticos sacados del seeder tipo revision laravel */}
        {!(revision.diagnostico == 'Aborto' || revision.diagnostico == 'Gestación')  &&  <div className="absolute left-[19%] top-[7%]">
          {/* boton flotante */}
          <ButtonsEditedDelete
            id={revision.id}
            size="md"
            hiddenDelete
            formId="form-edit-revision"
            onEdit={onEdit}
            state={stateButton}
            onCancel={onSaveOrCancel}
            isLoading={isLoading}
            onDelete={onDelete}
          />
        </div>}

        {stateButton == "save" ? (
          <RevisionEdit setIsLoading={setIsLoading} revision={revision} onSaveOrCancel={onSaveOrCancel} />
        ) : (
          <div className="flex flex-col gap-4 mb-4">
            <p>
              <b>Diagnostico: </b> {revision.diagnostico}
            </p>
            <p>
              <b>Tratamiento: </b> {revision.tratamiento}
            </p>
            <p>
              <b>Veterinario que hizo la revision: </b>
              {revision.veterinario.nombre}
            </p>
          </div>
        )}
      </>
    </LayoutModal>
  );
};

type RevisionProps = {
  revision: Revision;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveOrCancel: () => void;
};
const RevisionEdit = ({ revision,setIsLoading,onSaveOrCancel }: RevisionProps) => {
  const form = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const { id: cattleId } = useParams<{ id: string }>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditCheckUp>({
    resolver: zodResolver(editCheckUpShema),
    defaultValues: {
      fecha: revision.fecha,
      tratamiento: revision.tratamiento,
    },
  });

  const actionEditCheckUp: () => void = handleSubmit(async (data) => {
    setIsLoading(true);
    const response = await editCheckUp(revision.id, data, parseInt(cattleId));
    //manejar error del backedn y mostar mensaje
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));
    setIsLoading(false);
    onSaveOrCancel();
    toast.success(`Revision Actualizada`);
    /* no se usa el refresh porque al hacerlo se bugea la navegacion */
    router.push(`/ganado/${cattleId}/revision`);
  });

  return (
    <form
      id="form-edit-revision"
      ref={form}
      action={actionEditCheckUp}
      className="flex flex-col pb-6 ps-5 items-center m-auto max-w-[827px]"
    >
      <div className="flex flex-col gap-6 flex-wrap justify-around md:gap-4 sm:flex-row ">
        <Input
          id="fecha"
          label="Fecha"
          type="date"
          register={register}
          errors={errors}
          required={true}
          defaultValue={revision.fecha}
        />

        <Input
          id="tratamiento"
          label="Tratamiento"
          type="text"
          register={register}
          errors={errors}
          required={true}
          defaultValue={revision.tratamiento}
        />
      </div>
    </form>
  );
};
