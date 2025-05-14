"use client";

import { headerBeef } from "@/collections/headerColums";
import {
  EstadosGanado,
  Pesos,
  GanadoDescarte,
  ResponseGanadoDescartes,
  User,
  Comprador,
} from "@/types";
import { Key, ReactNode, useCallback, useState } from "react";
import { LayoutTable, TableComponent } from "..";
import { RedirectInTable } from "@/components/redirectsInTables";
import { DropDownOptions } from "@/components/dropdown options";
import { DropdownStatesCattle } from "@/components/dropdown states cattle";
import IconCheck from "@/icons/icono-check.svg";
import { ButtonFilterStateCattle } from "@/components/filter state cattle";
import { Selection, useDisclosure } from "@nextui-org/react";
import { Button } from "@/ui/Button";
import { ModalSaleCattle } from "@/components/modals/sale cattle";

export const TableDiscardedCattle = ({
  ganado_descartes,
  role,
  ListaCompradoresRegistrados
}: ResponseGanadoDescartes & { role: User["rol"] } & { ListaCompradoresRegistrados:Comprador[]}) => {
  const renderCell = useCallback(
    (ganado_descarte: GanadoDescarte, columnKey: keyof GanadoDescarte) => {
      const cellValue = ganado_descarte[columnKey as keyof GanadoDescarte];

      switch (columnKey as keyof GanadoDescarte) {
        case "numero": {
          const numero = cellValue as number;
          return (
            <RedirectInTable
              id={ganado_descarte["id"]}
              label={numero ?? ""}
              redirect="ganado_descarte"
            />
          );
        }
        case "pesos": {
          const pesos = cellValue as Pesos;

          return (
            <div>
              {pesos
                ? pesos.peso_actual
                  ? pesos.peso_actual
                  : "desconocido"
                : "desconocido"}
            </div>
          );
        }
        case "estados": {
          const estados = cellValue as EstadosGanado[];

          return <DropdownStatesCattle estados={estados} />;
        }
        case "id": {
          const id = ganado_descarte["ganado_id"];
          const estados = ganado_descarte["estados"] as EstadosGanado[];
          return !estados.some(
            ({ estado }) => estado == "fallecido" || estado == "vendido",
          ) ? (
            <DropDownOptions
              disabledDiscardCattle={true}
              idCattle={id}
              optionType="cattle"
              role={role}
            />
          ) : (
            <IconCheck className={"size-8"} />
          );
        }

        default:
          return cellValue as ReactNode;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [idsItems, setIdsItems] = useState<Array<number> | null>([]);

   /* Estado modal */
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const resetIdsItems = () => {
    setIdsItems(null);
  };
  return (
    <div className="w-full relative">
      {idsItems != null && idsItems.length > 0 && (
        <div className="flex items-center gap-2 justify-between p-4 bg-[#caffc4] border border-[#22ff1e] rounded-lg  w-64 absolute right-4 -top-12">
          <p className="font-bold text-balance text-[#00b806]">
            {idsItems.length}  {idsItems.length > 1 ? "animales seleccionados" : "animal seleccionado"}
          </p>
          <Button content={"Vender"} onClick={onOpen} />
        </div>
      )}
      <TableComponent
        type="beef"
        columnsCollection={headerBeef}
        items={ganado_descartes}
        renderCell={renderCell}
        selectionMode="multiple"
        setSelectedIdItems={setIdsItems}
        filterSexCattle
      />

        <ModalSaleCattle
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
              onClose={onClose}
              selectCompradores={ListaCompradoresRegistrados}
              sale="multiple"
              itemsIds={idsItems as number[]}
              resetItemsIds={resetIdsItems}
            />
    </div>
  );
};
