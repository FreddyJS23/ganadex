"use client";

import type { LogVeterinary, ModalProps } from "@/types";
import { LayoutModal } from "@/components/modals";

import { TableLogsVeterinary } from "@/components/tables/logs veterinary";

export const ModalLogsVeterinary = ({
  logs_veterinario,
}: ModalProps & { logs_veterinario: LogVeterinary[] }) => {
  return (
    <LayoutModal
      icon="customer"
      titleModal={"Historial de actividades"}
      footer={false}
      isOpen={true}
    >
      <TableLogsVeterinary logs={logs_veterinario} />
    </LayoutModal>
  );
};
