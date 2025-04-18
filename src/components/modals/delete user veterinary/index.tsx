"use client";

import { LayoutModal } from "..";
import type { LayoutModalProps } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteUserVeterinary } from "@/actions/userVeterinary";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";

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
  const router = useRouter();

  const actionDeleteUserVeterinary = async () => {
    const response = await deleteUserVeterinary(id);
    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response!)
      return toast.error(messageErrorApi(response));

    toast.success("Usuario eliminado");
    router.refresh();
    onClose && onClose();
  };

  return (
    <LayoutModal
      icon="customer"
      titleModal={"Eliminar usuario veterinario: "}
      dataHeader={`${dataHeader} ?`}
      footer={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClick={actionDeleteUserVeterinary}
      onClose={onClose}
    >
      <p>Confirmar la eliminación de usuario</p>
    </LayoutModal>
  );
};
