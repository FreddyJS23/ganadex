"use client";

import { headerStaff } from "@/collections/headerColums";
import { Personal, PositionStaff } from "@/types";
import { Key, ReactNode, useCallback, useState } from "react";
import {  TableComponent } from "..";
import IconAdd from "@/icons/icono-plus.svg";
import IconRemove from "@/icons/icono-cerrar-notificacion.svg";
import { toast } from "sonner";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { addInHacienda, removeInHacienda } from "@/actions/personal";
import { useRouter } from "next/navigation";
import { Button, useDisclosure } from "@nextui-org/react";
import IconEdit from "@/icons/icono-editar.svg";
import { ModalEditStaff } from "@/components/modals/edit staff";

type TableStaffProps = {
  todo_personal: Personal[];
  nameHacienda: string;
  cargos_personal: PositionStaff[];
};

export const TableStaff = ({
  todo_personal,
  nameHacienda,
  cargos_personal,
}: TableStaffProps) => {
  //Utilizado para refrescar la tabla cuando se interactúa con datos de la tabla
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reloadData, setReloadData] = useState(0);

  /* Estado modal */
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  /* data modal */
  const [dataModal, setDataModal] = useState<Personal | null>(null);

  const onEdit = (personal: Personal) => {
    setDataModal(personal);
    onOpen();
  };

  const haciendasNames = (haciendas: Personal["haciendas"]) => {
    const haciendasNames = haciendas.map(({ nombre }) => nombre);
    return haciendasNames.join(", ");
  };

  const renderCell = useCallback((personal: Personal, columnKey: Key) => {
    const cellValue = personal[columnKey as keyof Personal];

    switch (columnKey as keyof Personal) {
      case "haciendas": {
        const haciendas = cellValue as Personal["haciendas"];
        return <span>{haciendasNames(haciendas)}</span>;
      }

      case "id": {
        const id = cellValue as number;
        if (!nameHacienda) return <></>;

        const sameHacienda = haciendasNames(personal["haciendas"]).includes(
          nameHacienda,
        );
        if (!sameHacienda && personal["cargo"] == "veterinario") {
          return (
            <EditButton onEdit={() => onEdit(personal)}>
              <ButtonAddOrRemoveHacienda
                type="add"
                nameHacienda={nameHacienda}
                id={id}
                setReloadData={setReloadData}
              />
            </EditButton>
          );
        } else if (sameHacienda && personal["cargo"] == "veterinario") {
          return (
            <EditButton onEdit={() => onEdit(personal)}>
              <ButtonAddOrRemoveHacienda
                type="remove"
                nameHacienda={nameHacienda}
                id={id}
                setReloadData={setReloadData}
              />
            </EditButton>
          );
        }

        return <EditButton onEdit={() => onEdit(personal)} />;
      }

      default:
        return cellValue as ReactNode;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableComponent
        type="staff"
        columnsCollection={headerStaff}
        items={todo_personal}
        renderCell={renderCell}
      />

      {dataModal && (
        <ModalEditStaff
          cargos_personal={cargos_personal}
          personal={dataModal}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      )}
    </>
  );
};

type EditButtonProps = {
  onEdit: () => void;
  children?: ReactNode;
};

const EditButton = ({ children, onEdit }: EditButtonProps) => {
  return (
    <div className="flex gap-2">
      <Button
        isIconOnly={true}
        aria-label="Guardar"
        variant="flat"
        size="sm"
        title={`Editar`}
        onClick={onEdit}
      >
        <IconEdit className="size-6" />
      </Button>

      {children}
    </div>
  );
};

type ButtonAddOrRemoveHaciendaProps = {
  type: "add" | "remove";
  nameHacienda: string;
  id: number;
  setReloadData: React.Dispatch<React.SetStateAction<number>>;
};
/* se usan en un componente externo para poder usar un loading,
anteriormente se usaba dentro del componente, ocasinando que al hacer
las acciones no mostrara un loading */
const ButtonAddOrRemoveHacienda = ({
  type,
  nameHacienda,
  id,
  setReloadData,
}: ButtonAddOrRemoveHaciendaProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const actionAddPersonal = async (personal_id: number) => {
    setIsLoading(true);
    const response = await addInHacienda(personal_id);
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));
    else toast.success(response);
    router.refresh();
    setIsLoading(false);
    setReloadData((prev) => prev + 1);
  };

  const actionRemovePersonal = async (personal_id: number) => {
    setIsLoading(true);

    const response = await removeInHacienda(personal_id);
    if (typeof response == "object" && "error" in response)
      return toast.error(messageErrorApi(response));
    else toast.success(response);
    router.refresh();
    setIsLoading(false);
    setReloadData((prev) => prev + 1);
  };

  return (
    <Button
      isIconOnly
      title={`Añadir a ${nameHacienda}`}
      aria-label="Guardar"
      variant="flat"
      size="sm"
      isLoading={isLoading}
      onClick={() => {
        type == "add" ? actionAddPersonal(id) : actionRemovePersonal(id);
      }}
    >
      {type == "add" ? (
        <IconAdd className="text-primary size-4" />
      ) : (
        <IconRemove className="text-error size-6" />
      )}
    </Button>
  );
};
