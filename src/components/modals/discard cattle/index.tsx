"use client";

import { useDisclosure } from "@nextui-org/modal";
import { LayoutModal } from "..";
import { ModalProps } from "@/types";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { discardCattle } from "@/actions/descartarGanado";

export const ModalDiscardCattle = ({
  dataHeader,
}: Pick<ModalProps, "dataHeader">) => {
  const { onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const actionDiscardCattle = async () => {
    try {
      await discardCattle(parseInt(params.id));
      toast.success(
        `Animal ${dataHeader} se encuentra en la sección de descarte`,
      );
      router.back();
      router.refresh();
    } catch (error) {
      const message = error as string;
      return toast.error(message);
    }
  };

  return (
    <LayoutModal
      icon="cattleV2"
      titleModal={`Añadir a la sección de descarte al animal `}
      dataHeader={`${dataHeader} ?`}
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      onClick={actionDiscardCattle}
    >
      <p>Esta acción no se puede devolver</p>
    </LayoutModal>
  );
};
