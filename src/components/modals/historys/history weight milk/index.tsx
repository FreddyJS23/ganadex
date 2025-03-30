"use client";

import { LayoutModal } from "../..";
import { ModalProps, PesajeLecheGanado } from "@/types";
import { TableHistoryWeightMilk } from "@/components/tables/in modals/history weight milk";
import { ContainerTableHistory } from "..";

export const ModalHistoryWeightMilk = ({
  pesajes_leche,
}: ModalProps & { pesajes_leche: PesajeLecheGanado[] }) => {
  return (
    <LayoutModal
      icon="milk"
      titleModal={"Historial pesajes mensuales de leche"}
      footer={false}
      isOpen={true}
    >
      <ContainerTableHistory>
        <TableHistoryWeightMilk pesajes_leche={pesajes_leche} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
