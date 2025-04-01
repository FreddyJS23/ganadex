"use client";

import { headerServices, headerWeightMilk } from "@/collections/headerColums";
import { ModalUpdateWeightMilk } from "@/components/modals/update weight milk";
import {  PesajeLecheGanado, ResponsePesajesLeche } from "@/types";
import ButtonEdit from "@/ui/ButtonEdit";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

export const TableHistoryWeightMilk = ({
  pesajes_leche,
}: ResponsePesajesLeche) => {
  /* Estado modal */
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  /* data modal */
  const [dataModal, setDataModal] = useState<PesajeLecheGanado | null>(null);

  const onEdit = (pesajeLeche: PesajeLecheGanado) => {
    setDataModal(pesajeLeche);
    onOpen();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {headerWeightMilk.map(({ label }) => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pesajes_leche.map(({ id, fecha, pesaje }) => (
              <tr key={id}>
                <td>{typeof fecha == "string" ? fecha : ""} </td>
                <td className="flex gap-2 items-center">
                  {pesaje}KG
                  <ButtonEdit onEdit={() => onEdit({ id, fecha, pesaje })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {dataModal && (
        <ModalUpdateWeightMilk
          pesajeLeche={dataModal}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      )}
    </>
  );
};
