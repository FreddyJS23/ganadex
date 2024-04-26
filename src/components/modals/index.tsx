import { iconsModal } from '@/collections/iconsModal';
import {  LayoutModalProps,  } from '@/types';
import { Button } from '@/ui/Button';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal';
import { useRouter } from 'next/navigation';
import { MutableRefObject, useEffect, useState } from 'react';



export const LayoutModal = ({
    titleModal,
    dataHeader,
    icon,
    footer,
    children,
    isOpen,
    onOpenChange,
    refForm,
}: LayoutModalProps) => {
    const Icon = iconsModal[icon];
    const [currentRefForm, setcurrentRefForm] = useState<MutableRefObject<HTMLFormElement | null> | undefined>(undefined)
   useEffect(() => {
     setcurrentRefForm(refForm)
   }, [refForm])
    const submit = () => {
currentRefForm?.current?.dispatchEvent(new Event('submit'))
    };
    const router = useRouter();

    const onClose = () => {
        router.back();
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{ base: 'bg-base-100' }}
            placement="center"
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-4">
                            <span className="size-12 p-[6px] bg-[#AF842D20] dark:bg-[#22FF1E20] rounded-full ">
                                <Icon />
                            </span>
                            <h2>
                                {titleModal}
                                {dataHeader}
                            </h2>
                        </ModalHeader>
                        <ModalBody>{children}</ModalBody>
                        {footer && (
                            <ModalFooter className="flex flex-col sm:flex-row-reverse ">
                                <Button type='submit' onClick={submit} content="Confirmar"  form={currentRefForm && currentRefForm.current ? currentRefForm.current.id : ''}  />
                                <Button
                                    onClick={onClose}
                                    color="default"
                                    content="Cancelar"
                                />
                            </ModalFooter>
                        )}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
