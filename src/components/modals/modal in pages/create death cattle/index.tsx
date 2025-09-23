"use client";

import { ModalDeathCattle } from "@/components/modals/create/death cattle";
import type { CausaFallecimiento } from "@/types";
import { useDisclosure } from "@nextui-org/react";

export const CreateDeathCattle = ({
  causas_fallecimeinto,
}: {
  causas_fallecimeinto: CausaFallecimiento[];
}) => {
  const { onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <ModalDeathCattle
        isOpen={true}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        causas_fallecimeinto={causas_fallecimeinto}
      />
    </>
  );
};
