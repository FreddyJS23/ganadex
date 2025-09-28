"use client";

import { LayoutModal } from "@/components/modals";

import type { ToroServicio } from "@/types";
import { ContainerTableHistory } from "..";
import { TableHistoryServicesBull } from "@/components/tables/in modals/history services bull";

export const ModalHistoryServicesBull = ({
  servicios,
}: {
  servicios: ToroServicio[];
}) => {
  return (
    <LayoutModal
      icon="serve"
      titleModal={"Historial de servicios"}
      footer={false}
      isOpen={true}
    >
      <ContainerTableHistory>
        <TableHistoryServicesBull servicios={servicios} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
