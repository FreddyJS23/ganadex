import { useMemo, useState } from "react";
import IconAdd from "@/icons/icono-add.svg";
import IconRemove from "@/icons/icono-error.svg";
import IconVaccine from "@/icons/icono-vacuna.svg";
import {
  Input as InputNextUI,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import type { AvailableVaccines, ListaVacunas } from "@/types";
import { SelectVaccines } from "../../../selects/select vaccines";
import { ButtonCreateItem } from "@/ui/ButtonCreate";

type ModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  listVaccines: ListaVacunas[];
  setListVaccines: React.Dispatch<React.SetStateAction<ListaVacunas[]>>;
};

type CreateListVaccinationProps = {
  listVaccines: ListaVacunas[];
  setListVaccines: React.Dispatch<React.SetStateAction<ListaVacunas[]>>;
  isChecked: boolean;
  vaccinesSelect: AvailableVaccines[];
  /**Se usara para no colocar vacunas antes de nacimiento */
  fecha_nacimiento: string;
};

export const CreateListVaccination = ({
  listVaccines,
  setListVaccines,
  isChecked,
  vaccinesSelect,
  fecha_nacimiento,
}: CreateListVaccinationProps) => {
  /* Estado del select */
  const [valueSelect, setValueSelect] = useState<number | null>(null);

  /* estado fecha vacunación  */
  const [fecha, setFecha] = useState<string>("");

  /* Estado modal */
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  /* Validación de fecha */
  const validateDate = (fecha: string) => {
    const regexDate =
      /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;
    return regexDate.test(fecha);
  };

  /* validación fecha vacuna no sea inferior a la fecha de nacimiento */
  const isHigherFechaNacimiento = useMemo(() => {
    const FechaNacimiento = new Date(fecha_nacimiento);
    const FechaVacunacion = new Date(fecha);
    return FechaNacimiento.getTime() > FechaVacunacion.getTime();
  }, [fecha, fecha_nacimiento]);

  isHigherFechaNacimiento;

  const isInvalidDate = useMemo(() => {
    if (fecha == "") return true;
    if (validateDate(fecha)) return false;
    return false;
  }, [fecha]);

  /* Validación de select vacunas */
  const isInvalidSelect = useMemo(() => {
    if (
      valueSelect == null ||
      !Number.isInteger(valueSelect) ||
      valueSelect > 30
    )
      return true;

    return false;
  }, [valueSelect]);

  /* comprobar que la vacuna no este repetida con una misma fecha */
  const checkIsRepeatedVaccine = () => {
    const isRepeated = ({ fecha: fechaInput, vacuna_id }: ListaVacunas) =>
      fecha == fechaInput ? vacuna_id == valueSelect : false;

    return listVaccines.some(isRepeated);
  };

  const resetInputs = () => {
    setFecha("");
    setValueSelect(null);
  };
  const aplicarIntervaloDosis = (fecha: string, intervalo = 1) => {
    const fechaVacunacion = new Date(fecha);
    //calcular el proximo dosis
    fechaVacunacion.setDate(fechaVacunacion.getDate() + intervalo);
    const agregarCeroFecha = (numero: number) =>
      numero < 10 ? `0${numero}` : numero;
    const año = fechaVacunacion.getFullYear();
    const mes = fechaVacunacion.getMonth() + 1;
    const dia = fechaVacunacion.getDate();
    return `${año}-${agregarCeroFecha(mes)}-${agregarCeroFecha(dia)}`;
  };

  const addtoListVaccines = () => {
    if (isInvalidDate || isInvalidSelect || valueSelect == null)
      return toast.error("Debe completar los campos fecha y vacunas");

    if (checkIsRepeatedVaccine())
      return toast.error(
        "Esta vacuna ya se encuentra en la lista con la fecha seleccionada",
      );

    if (isHigherFechaNacimiento)
      return toast.error(
        "La vacuna no puede ser antes de la fecha de nacimiento",
      );

    const intervaloDosis = vaccinesSelect.find(
      (v) => v.id == valueSelect,
    )?.intervalo_dosis;

    const generateId = `vacunaId-${Date.now()}`;
    const vaccine: ListaVacunas = {
      id: generateId,
      vacuna_id: valueSelect,
      fecha: fecha,
      prox_dosis: aplicarIntervaloDosis(fecha, intervaloDosis),
    };

    toast.success(`Vacuna añadida`);
    setListVaccines([...listVaccines, vaccine]);
    resetInputs();
  };

  return (
    <div className="flex gap-2 w-full">
      {isChecked && (
        <div className="flex w-full gap-4">
          <InputNextUI
            id={"fecha_vacunacion"}
            color={`${isInvalidDate ? "danger" : "primary"}`}
            isInvalid={isInvalidDate}
            classNames={{
              label: "text-current font-bold",
              input: "text-current",
            }}
            variant="underlined"
            type={"date"}
            label={"Fecha"}
            placeholder={" "}
            description={"fecha de vacunación"}
            size={"md"}
            onValueChange={setFecha}
            min={1}
            value={fecha}
          />
          <div className="flex w-full gap-2 items-center">
            <ButtonCreateItem
              tittle="Nueva vacuna"
              small={true}
              href={"/vacuna"}
            />
            <SelectVaccines
              type="listVaccination"
              valueSelect={valueSelect}
              vaccinesSelect={vaccinesSelect}
              isInvalidSelect={isInvalidSelect}
              setValueSelect={setValueSelect}
            />
          </div>
        </div>
      )}

      {/* botones */}
      {/* botón, no se usa el etiqueta button porque dispara el evento click */}
      {isChecked && (
        <div className={`flex gap-3 items-center`}>
          <span
            title="Añadir vacuna"
            className="cursor-pointer size-fit"
            onClick={addtoListVaccines}
          >
            <IconAdd className={"size-10"} />
          </span>

          <span
            title="Ver vacunas"
            onClick={onOpen}
            className="cursor-pointer size-fit"
          >
            <IconVaccine className={"size-10"} />
          </span>
        </div>
      )}
      {!isChecked && listVaccines.length > 0 && (
        <div className={`flex w-full gap-3 justify-end`}>
          {!isChecked && listVaccines.length > 0 && (
            <span
              title="Ver vacunas"
              onClick={onOpen}
              className="cursor-pointer size-fit self-end ml-12"
            >
              <IconVaccine className={"size-14"} />
            </span>
          )}
        </div>
      )}

      <ListVaccinesModal
        listVaccines={listVaccines}
        setListVaccines={setListVaccines}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

const ListVaccinesModal = ({
  listVaccines,
  setListVaccines,
  isOpen,
  onOpenChange,
}: ModalProps) => {
  const removeVaccine = (vacuna: ListaVacunas) => {
    const index = listVaccines.findIndex((v) => v.id == vacuna.id);
    if (index > -1) {
      listVaccines.splice(index, 1);
      setListVaccines([...listVaccines]);
    }
  };
  return (
    <Modal
      classNames={{ base: "bg-base-100" }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xs"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Lista de vacunas
          </ModalHeader>
          <ModalBody>
            {listVaccines.map((vacuna) => (
              <div
                key={vacuna.id}
                className="flex gap-4 p-2 items-center justify-around"
              >
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-bold">
                    Vacuna: {vacuna.vacuna_id}
                  </div>
                  <div className="text-sm font-bold">Fecha: {vacuna.fecha}</div>
                  <div className="text-sm font-bold">
                    prox dosis: {vacuna.prox_dosis}
                  </div>
                </div>

                <div
                  className="size-8 cursor-pointer"
                  onClick={() => removeVaccine(vacuna)}
                >
                  <IconRemove />
                </div>
              </div>
            ))}
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};
