"use client";

import { RedirectInTable } from "@/components/redirectsInTables";
import { LayoutModal } from "../..";
import type { ModalProps, Parto } from "@/types";
import { useEditDelete } from "@/lib/hooks/useEditDelete";
import { ButtonsEditedDelete } from "@/ui/Buttons edit-delete";
import { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { UpdateBirh } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBirhthShema } from "@/validations/birthShema";
import { updateBirth } from "@/actions/parto";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { toast } from "sonner";
import { Input } from "@/components/Inputs";

export const ModalBirth = ({ parto }: ModalProps & { parto: Parto }) => {
  const { crias, fecha, observacion, padre_toro, pajuela_toro, personal } =
    parto;

  //si hay mas de dos crías en el parto
  const gemelos = crias.length > 1;

  const typeBaby = (
    id: number,
    toro_id: number | null,
    descarte_id: number | null,
    numero: number | null,
  ) => {
    let redirect: "ganado" | "toros" | "ganado_descarte" = "ganado";

    if (toro_id) {
      id = toro_id;
      redirect = "toros";
    } else if (descarte_id) {
      id = descarte_id;
      redirect = "ganado_descarte";
    }

    return <RedirectInTable label={numero} id={id} redirect={redirect} />;
  };

  const {
    stateButton,
    onEdit,
    onDelete,
    isLoading,
    setIsLoading,
    onSaveOrCancel,
  } = useEditDelete();

  return (
    <LayoutModal
      icon="pregnancy"
      titleModal={"Parto del "}
      footer={false}
      isOpen={true}
      dataHeader={typeof fecha == "string" ? fecha : ""}
    >
      <>
        <div className="absolute left-[19%] top-[7%]">
          {/* botón flotante */}
          <ButtonsEditedDelete
            id={parto.id}
            size="md"
            hiddenDelete
            formId="form-edit-parto"
            onEdit={onEdit}
            state={stateButton}
            onCancel={onSaveOrCancel}
            isLoading={isLoading}
            onDelete={onDelete}
          />
        </div>

        {stateButton == "save" ? (
          <PartoEdit
            setIsLoading={setIsLoading}
            parto={parto}
            onSaveOrCancel={onSaveOrCancel}
          />
        ) : (
          <div className="flex flex-col gap-4 mb-4">
            <p>
              <b>Observación del parto: </b> {observacion}
            </p>
            <p className="flex gap-1">
              <b>Padre de la cría: </b>{" "}
              {padre_toro ? (
                <RedirectInTable
                  id={padre_toro.id}
                  label={padre_toro.numero}
                  redirect="toros"
                />
              ) : (
                pajuela_toro?.codigo
              )}
            </p>
            {crias.map(
              (
                {
                  nombre,
                  numero,
                  peso_nacimiento,
                  sexo,
                  observacion,
                  id,
                  toro_id,
                  descarte_id,
                },
                index,
              ) => {
                return (
                  <>
                    {/* al ser dos crias se coloca una numeracion a cada una */}
                    {gemelos && <b>Cría #{index + 1}</b>}

                    <p>
                      <b>Nombre de la cría: </b> {nombre}
                    </p>
                    <p className="flex gap-1">
                      <b>Numero de la cría: </b>{" "}
                      {typeBaby(id, toro_id, descarte_id, numero)}
                    </p>
                    <p>
                      <b>Peso nacimiento de la cría: </b>
                      {peso_nacimiento + " kg"}
                    </p>
                    <p>
                      <b>Sexo de la cría: </b> {sexo}
                    </p>
                    <p>
                      <b>Observación de la cría: </b> {observacion}
                    </p>
                  </>
                );
              },
            )}

            <p>
              <b>
                {personal.cargo == "veterinario" ? "Veterinario " : "Obrero "}{" "}
                que atendió el parto:{" "}
              </b>{" "}
              {personal.nombre}
            </p>
          </div>
        )}
      </>
    </LayoutModal>
  );
};

type PartoProps = {
  parto: Parto;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveOrCancel: () => void;
};
const PartoEdit = ({ parto, setIsLoading, onSaveOrCancel }: PartoProps) => {
  const form = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const { id: cattleId } = useParams<{ id: string }>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateBirh>({
    resolver: zodResolver(updateBirhthShema),
    defaultValues: {
      fecha: parto.fecha,
      observacion: parto.observacion,
    },
  });

  const actionUpdateBirth: () => void = handleSubmit(async (data) => {
    setIsLoading(true);
    const response = await updateBirth(
      parto.id,
      Number.parseInt(cattleId),
      data,
    );
    //manejar error del backend y mostrar mensaje
    if (typeof response == "object" && "error" in response) {
      setIsLoading(false);
      return toast.error(messageErrorApi(response));
    }
    setIsLoading(false);
    onSaveOrCancel();
    toast.success(`Parto Actualizada`);
    /* no se usa el refresh porque al hacerlo se bugea la navegación */
    router.push(`/ganado/${cattleId}/parto`);
  });

  return (
    <form
      id="form-edit-parto"
      ref={form}
      action={actionUpdateBirth}
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
          defaultValue={parto.fecha}
        />

        <Input
          id="observacion"
          label="Observación"
          type="text"
          register={register}
          errors={errors}
          required={true}
          defaultValue={parto.observacion}
        />
      </div>
    </form>
  );
};
