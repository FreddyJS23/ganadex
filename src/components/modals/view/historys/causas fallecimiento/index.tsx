"use client";

import { LayoutModal } from "../..";
import { CausaFallecimiento, ModalProps } from "@/types";
import { ContainerTableHistory } from "..";
import { TableCausasFallecimiento } from "@/components/tables/in modals/causas fallecimiento";

export const ModalCausasFallecimiento = ({
  causas_fallecimiento,
}: ModalProps & { causas_fallecimiento: CausaFallecimiento[] }) => {
  return (
    <LayoutModal
      icon="dead"
      titleModal={"Causas de fallecimiento"}
      footer={false}
      isOpen={true}
    >
      <ContainerTableHistory>
        <TableCausasFallecimiento causas_fallecimiento={causas_fallecimiento} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
