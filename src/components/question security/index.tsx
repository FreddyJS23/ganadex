"use client";

import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/ui/Button";
import { createOrUpdateResponseSecurityShema } from "@/validations/responseSecurity";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createResponseSecurity,
  deleteResponseSecurity,
  updateResponseSecurity,
} from "@/actions/respuestasSeguridad";
import { Input } from "../Inputs";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";

import type { PreguntasSeguridad, RespuestasSeguridad } from "@/types";
import React from "react";
import { ElementProfile, LayoutCenterContentTabs } from "../tabs profile/items";
import { ButtonsEditedDelete } from "@/ui/Buttons edit-delete";
import { Select } from "../select";
import type { CreateOrUpdateResponseSecurity } from "@/types/forms";
import IconSave from "@/icons/icono-save.svg";
import { useEditDelete } from "@/lib/hooks/useEditDelete";

type QuestionSecurityProps = {
  preguntas_seguridad: PreguntasSeguridad[];
  respuestas_seguridad: RespuestasSeguridad[];
};

type baseCreateOrEditProps = {
  availableQuestion: PreguntasSeguridad[];
};

type CreateProps = baseCreateOrEditProps & {
  type: "create";
};

type EditProps = baseCreateOrEditProps & {
  type: "edit";
  id: number;
  pregunta_seguridad_id: number;
  onSave: () => void;
};

type CreateOrEditProps = CreateProps | EditProps;

export const QuestionSecurity = ({
  preguntas_seguridad,
  respuestas_seguridad,
}: QuestionSecurityProps) => {
  const { stateButton, idAction, isLoading, onEdit, onDelete, onSaveOrCancel } =
    useEditDelete(deleteResponseSecurity);

  /* deshabilitar el botón de crear pregunta de seguridad si ya tiene 7 preguntas */
  const createQuestion = respuestas_seguridad.length < 7;

  return (
    <>
      {respuestas_seguridad.map(
        ({ id, pregunta, pregunta_seguridad_id, respuesta, updated_at }) => (
          <LayoutCenterContentTabs key={id}>
            {stateButton == "save" && idAction == id ? (
              <div className="flex w-full">
                {/* Editar pregunta */}
                <CreateOrEdit
                  type="edit"
                  id={id}
                  availableQuestion={preguntas_seguridad.concat([
                    {
                      id: pregunta_seguridad_id,
                      pregunta: pregunta,
                    },
                  ])}
                  pregunta_seguridad_id={pregunta_seguridad_id}
                  onSave={onSaveOrCancel}
                />
                <ButtonsEditedDelete
                  id={id}
                  formId="form-edit-question"
                  state="save"
                  onCancel={onSaveOrCancel}
                  isLoading={isLoading}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  size="sm"
                />
              </div>
            ) : (
              <>
                {/* Ver pregunta de seguridad */}
                <ElementProfile
                  key={id}
                  tittle={pregunta}
                  description={`Actualizado el ${updated_at}`}
                  content={respuesta}
                  divider={false}
                />
                <ButtonsEditedDelete
                  id={id}
                  state="edit"
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isLoading={isLoading}
                  onCancel={onSaveOrCancel}
                  formId="form-edit-question"
                  size="sm"
                />
              </>
            )}
          </LayoutCenterContentTabs>
        ),
      )}

      {/* Crear pregunta de seguridad */}
      {createQuestion && (
        <div>
          <ElementProfile
            divider={false}
            tittle="Nueva Pregunta de Seguridad"
          />
          <CreateOrEdit type="create" availableQuestion={preguntas_seguridad} />
        </div>
      )}
    </>
  );
};

const CreateOrEdit = (props: CreateOrEditProps) => {
  const { type, availableQuestion } = props;
  const router = useRouter();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CreateOrUpdateResponseSecurity>({
    resolver: zodResolver(createOrUpdateResponseSecurityShema),
    defaultValues:
      type == "edit"
        ? { pregunta_seguridad_id: props.pregunta_seguridad_id }
        : {},
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  const actionCreateOrUpdateResponse: () => void = handleSubmit(
    async (data) => {
      const response =
        type == "edit"
          ? await updateResponseSecurity(props.id, data)
          : await createResponseSecurity(data);
      /* manejar error del backend y mostrar mensaje */
      if (typeof response == "object" && "error" in response!)
        return toast.error(messageErrorApi(response));

      toast.success(
        `${type == "create" ? "Pregunta creada " : "Pregunta editada"}  correctamente`,
      );
      if (type == "edit") {
        props.onSave();
      }
      formRef.current?.reset();
      router.refresh();
    },
  );

  return (
    <form
      className="flex flex-col pb-4 px-8 sm:p-2 sm:items-center grow"
      action={actionCreateOrUpdateResponse}
      ref={formRef}
      id={`form-${type}-question`}
    >
      <div className="flex gap-6 w-full">
        <div className="w-full max-w-lg">
          <Controller
            name={"pregunta_seguridad_id"}
            control={control}
            render={({ field }) => (
              <Select
                field={field}
                id={"pregunta_seguridad_id"}
                items={converToSelectOptions(availableQuestion)}
                label={"Pregunta seguridad"}
                errors={errors}
                value={type == "edit" ? props.pregunta_seguridad_id : undefined}
                required={true}
              />
            )}
          />
        </div>

        <div className="sm:max-w-64 sm:w-60">
          <Input
            id="respuesta"
            required
            type="text"
            description="Tu respuesta será cifrada y almacenada de forma segura."
            label="Respuesta"
            register={register}
            errors={errors}
          />
        </div>
      </div>
      {type == "create" && (
        <div className="w-28 self-start">
          <Button
            type="submit"
            onClick={() => {}}
            title="Guardar"
            content={
              <>
                <IconSave className={"size-6"} /> <span>Guardar</span>{" "}
              </>
            }
          />
        </div>
      )}
    </form>
  );
};
