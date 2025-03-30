"use client";

import { LayoutModal } from "../..";
import { ModalProps, Parto } from "@/types";
import { TableHistoryBirths } from "@/components/tables/in modals/history births";
import { ContainerTableHistory } from "..";

export const ModalHistoryBirths = ({
  partos,
}: ModalProps & { partos: Parto[] }) => {
  return (
    <LayoutModal
      icon="pregnancy"
      titleModal={"Historial de partos"}
      footer={false}
      isOpen={true}
    >
      <ContainerTableHistory>
        <TableHistoryBirths partos={partos} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
