"use client";

import { LayoutModal } from "../..";
import { ModalProps, Vaccine } from "@/types";
import { ContainerTableHistory } from "..";
import { TableAvailableVaccines } from "@/components/tables/in modals/avaliable vaccines";

export const ModalVaccines = ({
  vacunas,
}: ModalProps & { vacunas: Vaccine[] }) => {
  return (
    <LayoutModal
      icon="checkUp"
      titleModal={"Vacunas registradas"}
      footer={false}
      isOpen={true}
    >
      <ContainerTableHistory>
        <TableAvailableVaccines vacunas={vacunas} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
