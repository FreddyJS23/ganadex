"use client";

import { ModalSaleMilk } from "@/components/modals/sale milk";
import { PreciosDeLeche } from "@/types";
import { useDisclosure } from "@nextui-org/react";

type ListaPreciosRegistradosProps = {
  ListaPreciosRegistrados: PreciosDeLeche[];
};

export const CreateSaleMilk = ({
  ListaPreciosRegistrados,
}: ListaPreciosRegistradosProps) => {
  const { onOpen, onOpenChange } = useDisclosure();

  return (
    <ModalSaleMilk
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      selectPrecios={ListaPreciosRegistrados}
    />
  );
};
