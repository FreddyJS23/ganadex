"use client";

import { ModalCreateVaccinationDay } from "@/components/modals/create/create vaccination day";
import type { ResponseVacunasDisponibles } from "@/types";
import { useDisclosure } from "@nextui-org/react";

export const CreateVaccinationDay = ({
  vacunas_disponibles,
}: ResponseVacunasDisponibles) => {
  const { onOpen, onOpenChange } = useDisclosure();

  return (
    <ModalCreateVaccinationDay
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      vacunas={vacunas_disponibles}
    />
  );
};
