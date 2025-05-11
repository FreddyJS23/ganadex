"use client";

import { LayoutModal } from "..";
import type { LayoutModalProps } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteUserVeterinary } from "@/actions/userVeterinary";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { useActionId } from "@/hooks/useActionId";

type ModalDeleteUserVeterinaryProps = Pick<
  LayoutModalProps,
  "dataHeader" | "isOpen" | "onOpenChange" | "onClose"
> & {
  id: number;
};

export const ModalDeleteUserVeterinary = ({
  dataHeader,
  id,
  isOpen,
  onOpenChange,
  onClose,
}: ModalDeleteUserVeterinaryProps) => {

  const {onAction} = useActionId({
    action: deleteUserVeterinary,
    id: id,
    messageOnSuccess: "usuarioEliminado",
    onClose: onClose,
    routerBack:false,
    justMessageOnSuccess: true,
  });

  return (
    <LayoutModal
      icon="customer"
      titleModal={"Eliminar usuario veterinario: "}
      dataHeader={`${dataHeader} ?`}
      footer={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClick={onAction}
      onClose={onClose}
    >
      <p>Confirmar la eliminación de usuario</p>
    </LayoutModal>
  );
};
