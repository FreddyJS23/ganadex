"use client";

import { LayoutModal } from "@/components/modals";

import type { ModalProps, Vacuna } from "@/types";
import { ContainerTableHistory } from "..";
import { TableHistoryVaccines } from "@/components/tables/in modals/history vaccines";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { Button } from "@/ui/Button";

type ModalHistoryVaccinesProps = ModalProps & { historial: Vacuna[] };

export const ModalHistoryVaccines = ({
  historial,
}: ModalHistoryVaccinesProps) => {
  const { onOpenChange, onOpen } = useDisclosure();
  const [openModal, setOpenModal] = useState(false);

  const onClose = () => setOpenModal(false);
  return (
    <>
      <Button
        content={"Historial"}
        color="primary"
        onClick={() => setOpenModal(true)}
      />
      <LayoutModal
        icon="vaccine"
        titleModal={"Historial de vacunas aplicadas"}
        footer={false}
        isOpen={openModal}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        onClose={onClose}
      >
        <ContainerTableHistory>
          <TableHistoryVaccines vacunas={historial} />
        </ContainerTableHistory>
      </LayoutModal>
    </>
  );
};
