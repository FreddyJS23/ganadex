"use client";

import { LayoutModal } from "../..";
import { ModalProps, PreciosDeLeche } from "@/types";
import { ContainerTableHistory } from "..";
import { TableHistoryPriceMilk } from "@/components/tables/in modals/history price milk";

export const ModalHistoryPricesMilk = ({
  precios,
}: ModalProps & { precios: PreciosDeLeche[] }) => {
  return (
    <LayoutModal
      icon="price"
      titleModal={"Historial de precio de la leche"}
      footer={false}
      isOpen={true}
    >
      <ContainerTableHistory>
        <TableHistoryPriceMilk precios={precios} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
