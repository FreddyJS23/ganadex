"use client";

import { LayoutModal } from "../..";
import { Servicio } from "@/types";
import { TableHistoryServices } from "@/components/tables/in modals/history services";
import { ContainerTableHistory } from "..";

export const ModalHistoryServices = ({
  servicios,
}: {
  servicios: Servicio[];
}) => {
  return (
    <LayoutModal
      icon="serve"
      titleModal={"Historial de servicios"}
      footer={false}
      isOpen={true}
    >
      <ContainerTableHistory>
        <TableHistoryServices servicios={servicios} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
