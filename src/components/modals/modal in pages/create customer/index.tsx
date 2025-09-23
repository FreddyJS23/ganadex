"use client";

import { ModalCreateCustomer } from "@/components/modals/create/create customer";
import { useDisclosure } from "@nextui-org/react";

export const CreateCustomer = ({ referer }: { referer?: string | null }) => {
  const { onOpen, onOpenChange } = useDisclosure();

  return (
    <ModalCreateCustomer
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      referer={referer}
    />
  );
};
