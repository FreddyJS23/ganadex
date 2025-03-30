"use client";

import { LayoutModal } from "../..";
import { ModalProps, TipoRevision } from "@/types";
import { ContainerTableHistory } from "..";
import { TableTypeCheck } from "@/components/tables/in modals/types check";

export const ModalTypeCheck = ({
  tipos_revision,
}: ModalProps & { tipos_revision: TipoRevision[] }) => {
  return (
    <LayoutModal
      icon="checkUp"
      titleModal={"Tipos de revision"}
      footer={false}
      isOpen={true}
    >
      <ContainerTableHistory>
        <TableTypeCheck tipos_revision={tipos_revision} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
