"use client";

import type {
  Ganado,
  GanadoDescarte,
  LayoutModalProps,
  ResponseGanado,
  Toro,
} from "@/types";
import type { EditCastle } from "@/types/forms";
import ButtonEdit from "@/ui/ButtonEdit";
import { castleEditShema } from "@/validations/castleShema";
import { useDisclosure } from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { LayoutModal } from "..";
import { formCastleEdit } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Controller, useForm } from "react-hook-form";
import { Select } from "@/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCastle } from "@/actions/vaca";
import { toast } from "sonner";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useRouter } from "next/navigation";
import { origenCasttleSelect } from "@/collections/origenCastleSelect";
import { editBull } from "@/actions/toro";
import { editBeef } from "@/actions/ganado_descarte";
import { useFormManager } from "@/hooks/useFormManager";

type dataProps = {
  ganado: Ganado | Toro | GanadoDescarte;
  type: "Vaca" | "Toro" | "Ganado descarte";
};

export const ModalEditAnimal = ({ ganado, type }: dataProps) => {
  /* Estado modal */
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <div className="absolute right-[-1%] top-[-7%]">
        <ButtonEdit onEdit={onOpen} />
      </div>

      <Modal
        ganado={ganado}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        type={type}
      />
    </>
  );
};

type ModalEdit = Pick<
  LayoutModalProps,
  "isOpen" | "onOpenChange" | "onClose"
> & {
  ganado: Ganado | Toro | GanadoDescarte;
  type: "Vaca" | "Toro" | "Ganado descarte";
};
const Modal = ({ ganado, isOpen, onOpenChange, onClose, type }: ModalEdit) => {

  const getIdOrigen = useMemo(() => {
    const origen = origenCasttleSelect.find(
      ({ label }) => label == ganado.origen,
    );
    return origen?.value ?? 1;
  }, [ganado.origen]);


  const actionsEdit = {
    Vaca: editCastle,
    Toro: editBull,
    "Ganado descarte": editBeef,
  };
  const defaultValues = {
    fecha_ingreso: ganado.fecha_ingreso as string | undefined,
    fecha_nacimiento: ganado.fecha_nacimiento as string | undefined,
    nombre: ganado.nombre,
    numero: ganado.numero as number | undefined,
    origen_id: getIdOrigen,
  };

  const { handleSubmitForm, errors, register, formRef, control,setValue } =
    useFormManager<
      EditCastle,
      | ResponseGanado["ganado"]["numero"]
      | ResponseGanado["ganado"]["nombre"]
      | undefined
    >({
      schema: castleEditShema,
      typeForm: "edit",
      id: ganado.id,
      submitEditAction: actionsEdit[type],
      defaultValues: defaultValues,
      messageOnSuccess: ()=> `${type} ${type == "Vaca" ? "actualizada" : 'actualizado'} correctamente`,
      justMessageOnSuccess: true,
      onClose: onClose,
      routerBack:false
    });


  //atributos para el input de fecha_ingreso
  const {
    id: fechaIngresoId,
    label: fechaIngresoLabel,
    required: fechaIngresoRequired,
  } = formCastleEdit[3];

  const [origen, setOrigen] = useState(getIdOrigen);

  const handleSelectionOrigenChange = (select: string | number) => {
    if (select == 1) {
      /* se usa el setValue porque el resetField no funciona, no borra el valor en el input,
                sin esto el valor se mantiene en el input y al enviar  el backend dará error ya que se esta mandando 
                el valor de fecha_ingreso en un formato incorrecto */
      setValue("fecha_ingreso", null);
    }
    setOrigen(select as 1 | 2);
  };

  return (
    <LayoutModal
      icon="cattleV2"
      titleModal={`Actualizar ${type}`}
      dataHeader={`${ganado.numero ?? ganado.nombre}`}
      footer={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      refForm={formRef}
    >
      <form
        id={`form-edit-${type}`}
        ref={formRef}
        action={handleSubmitForm}
        className="flex flex-col items-center m-auto max-w-[827px]"
      >
        <div className="flex flex-col  gap-6 flex-wrap justify-around md:gap-12 sm:flex-row ">
          {formCastleEdit.map(
            ({ id, label, required, type, endContent, select }) =>
              id != "fecha_ingreso" && (
                <div key={id} className="sm:w-44">
                  {type != "select" && id != "origen_id" && (
                    <Input
                      key={id}
                      id={id}
                      label={label}
                      required={required}
                      type={type}
                      endContent={endContent}
                      register={register}
                      errors={errors}
                      defaultValue={ganado[id]}
                    />
                  )}

                  {/*  select normal */}
                  {type == "select" && select && id == "origen_id" && (
                    <Controller
                      name={id}
                      control={control}
                      render={({ field }) => (
                        <Select
                          field={field}
                          id={id}
                          items={select}
                          label={label}
                          errors={errors}
                          required={required}
                          value={getIdOrigen}
                          handleSelectionChange={handleSelectionOrigenChange}
                        />
                      )}
                    />
                  )}
                </div>
              ),
          )}

          {/* campo fecha ingreso condiciona si se selecciono origen externo */}
          {origen == 2 && (
            <Input
              id={fechaIngresoId}
              label={fechaIngresoLabel}
              type={"date"}
              register={register}
              errors={errors}
              required={fechaIngresoRequired}
              defaultValue={ganado.fecha_ingreso ?? undefined}
            />
          )}
        </div>
      </form>
    </LayoutModal>
  );
};
