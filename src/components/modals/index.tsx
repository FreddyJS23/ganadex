import { iconsModal } from "@/collections/iconsModal";
import type { LayoutModalProps } from "@/types";
import { Button } from "@/ui/Button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { type MutableRefObject, useEffect, useState } from "react";

export const LayoutModal = ({
  titleModal,
  dataHeader,
  icon,
  footer,
  children,
  isOpen,
  onOpenChange,
  refForm,
  onClick,
  onClose,
  isDismissable = false,
}: LayoutModalProps) => {
  const Icon = iconsModal[icon];
  const [currentRefForm, setcurrentRefForm] = useState<
    MutableRefObject<HTMLFormElement | null> | undefined
  >(undefined);
  useEffect(() => {
    setcurrentRefForm(refForm);
  }, [refForm]);
  const submit = () => {
    currentRefForm?.current?.dispatchEvent(new Event("submit"));
  };
  const router = useRouter();

  const onCloseWhenIsRoute = () => {
    router.back();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ base: "bg-base-100" }}
      placement="center"
      onClose={onClose ? onClose : onCloseWhenIsRoute}
      isDismissable={isDismissable}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-4">
              <span className="size-12 p-[6px] bg-[#AF842D20] dark:bg-[#22FF1E20] rounded-full ">
                <Icon />
              </span>
              {/* titulo modal estatico */}
              {typeof dataHeader == "number" ||
              typeof dataHeader == "string" ? (
                <h2>
                  {titleModal}
                  {dataHeader}
                </h2>
              ) : (
                /* titulo modal dinamico con elementos TSX */
                <div className="flex flex-wrap gap-2 items-center">
                  <h2>{titleModal}</h2>
                  {dataHeader}
                </div>
              )}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            {footer && (
              <ModalFooter className="flex flex-col sm:flex-row-reverse ">
                <Button
                  type="submit"
                  onClick={onClick ? onClick : submit}
                  content="Confirmar"
                  form={
                    currentRefForm && currentRefForm.current
                      ? currentRefForm.current.id
                      : ""
                  }
                />
                <Button onClick={onClose} color="default" content="Cancelar" />
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
