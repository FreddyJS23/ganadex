"use client";

import IconRestoreBd from "@/icons/icono-restaurar.svg";
import { toast } from "sonner";
import { useDisclosure } from "@nextui-org/modal";
import { restoreBd } from "@/actions/restoreBd";
import { useState } from "react";
import { LayoutModal } from "../modals";
import { useRouter } from "next/navigation";

type ButtonRestoreBdProps = {
  dateLastBackup: string | null;
};

export const ButtonRestoreBd = ({ dateLastBackup }: ButtonRestoreBdProps) => {
  const { onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const onClose = () => setOpenModal(false);

  const clickRestoreBd = () => {
    if (dateLastBackup == null) toast.error("No hay respaldo existente");
    else {
      setOpenModal(true);
    }
  };

  const actionRestoreBd = async () => {
    try {
      await restoreBd();
      toast.success("Restauración exitosa");
      router.refresh();

      onClose();
    } catch (error) {
      return toast.error("Error al realizar la restauración");
    }
  };

  return (
    <>
      <button title="Restaurar base de datos" onClick={() => clickRestoreBd()}>
        <IconRestoreBd className={"size-8"} />
      </button>

      <LayoutModal
        icon="restoreBd"
        titleModal={"Restaurar base de datos"}
        footer={true}
        isOpen={openModal}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClick={actionRestoreBd}
        onClose={onClose}
      >
        <p>
          El ultimo respaldo fue el <b>{dateLastBackup}</b>, desea restaurarlo?
          Al realizar esta acción perderá la información que se haya registrado
          posterior a la fecha del respaldo,
          <b> esta acción no es reversible</b>
        </p>
      </LayoutModal>
    </>
  );
};
