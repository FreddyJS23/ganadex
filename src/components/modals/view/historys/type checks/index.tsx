"use client";

import { LayoutModal } from "@/components/modals";

import type { ModalProps, TipoRevision } from "@/types";
import { ContainerTableHistory } from "..";
import { TableTypeCheck } from "@/components/tables/in modals/types check";

export const ModalTypeCheck = ({
  tipos_revision,
}: ModalProps & { tipos_revision: TipoRevision[] }) => {
  return (
    <LayoutModal
      icon="checkUp"
      titleModal={"Tipos de revisión"}
      footer={false}
      isOpen={true}
    >
      <ContainerTableHistory>
        <TableTypeCheck tipos_revision={tipos_revision} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
