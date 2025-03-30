"use client";

import { ModalCreateHacienda } from "@/components/modals/create hacienda";
import { useDisclosure } from "@nextui-org/react";

export const CreateHacienda = ({
  primeraHacienda = false,
}: { primeraHacienda?: boolean }) => {
  const { onOpen, onOpenChange } = useDisclosure();

  return (
    <ModalCreateHacienda
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      primeraHacienda={primeraHacienda}
    />
  );
};
