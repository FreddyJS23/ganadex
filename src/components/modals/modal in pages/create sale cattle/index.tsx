"use client";

import { ModalSaleCattle } from "@/components/modals/create/sale cattle";
import type { Comprador } from "@/types";
import { useDisclosure } from "@nextui-org/react";

export const CreateSaleCattle = ({
  ListaCompradoresRegistrados,
}: {
  ListaCompradoresRegistrados: Comprador[];
}) => {
  const { onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <ModalSaleCattle
        isOpen={true}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        selectCompradores={ListaCompradoresRegistrados}
      />
    </>
  );
};
