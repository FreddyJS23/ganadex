import { changeSessionHacienda } from "@/actions/cambiarSesionHacienda";
import { Hacienda } from "@/types";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import {
  Button as ButtonNextUI,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/ui/Button";
import IconHacienda from "@/icons/icono-hacienda.svg";
import IconArrowRight from "@/icons/icono-flecha_derecha1.svg";
import { getSession, useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

type ModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  hacienda: Hacienda;
};

export const ChangeSessionHacienda = ({ hacienda }: { hacienda: Hacienda }) => {
  /* Estado modal */
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ButtonNextUI
        size="sm"
        color={"primary"}
        className="w-28 mt-1 "
        onClick={onOpen}
      >
        Trabajar
      </ButtonNextUI>

      <ModalHaciendaSession
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hacienda={hacienda}
      />
    </>
  );
};

const ModalHaciendaSession = ({
  isOpen,
  onOpenChange,
  hacienda,
}: ModalProps) => {
  const router = useRouter();

  const { update, data: session, status } = useSession();

  useEffect(() => {
    /* Llamar a la sesion para que el status el hook useSession se actualice y pase a authenticated,
        si no se hace esto el state queda en unauthenticated y no se actualiza, no permitiendo que se llame
        la funcion update para actualizar la sesion */
    const fetchSession = async () => await getSession();

    fetchSession();
  }, []);

  const actionChangeSessionHacienda = async (hacienda_id: number) => {
    const response = await changeSessionHacienda(hacienda_id);

    /*ver si es tipo objecto para evitar conflictos de tipo para manejar error del backedn y mostar mensaje */
    if (typeof response == "object")
      if ("error" in response) return toast.error(messageErrorApi(response));

    //actualizar hacienda en sesion
    await update({
      ...session,
      user: { ...session?.user, hacienda: hacienda },
    });
    toast.success(`Empezando a trabajar en ${response.hacienda.nombre}`);
    router.push(`/api/verificar_sesion_hacienda`);
  };

  return (
    <Modal
      classNames={{ base: "bg-base-100" }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3>Cambiar área de trabajo</h3>
              <p className="text-sm opacity-60">
                Estás a punto de cambiar la sesión de trabajo con esta hacienda
              </p>
            </ModalHeader>
            <ModalBody>
              {/* detalles de la hacienda */}
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16  overflow-hidden">
                    <IconHacienda className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold">{hacienda.nombre}</h2>
                    <span className="text-sm opacity-60">
                      {hacienda.fecha_creacion}
                    </span>
                  </div>
                </div>

                <div className="divider divider-horizontal divider-primary opacity-20"></div>

                <div className="text-sm opacity-60">
                  Al cambiar la sesión por esta hacienda, podrás acceder a toda
                  su información, gestionar sus recursos y realizar operaciones.
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} color="default" content="Cancelar" />

              <Button
                type="submit"
                onClick={() => actionChangeSessionHacienda(hacienda.id)}
                content={"Confirmar"}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
