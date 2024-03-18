import { iconsModal } from '@/collections/iconsModal';
import { IconsModal,LayoutModalProps,TitlesModals } from '@/types';
import { Button } from '@/ui/Button';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
   
} from '@nextui-org/modal';
import { useRouter } from 'next/navigation';


export const LayoutModal = ({
    titleModal,
    dataHeader,
    icon,
    footer,
    children,
    isOpen,
    onOpen,
    onOpenChange,
  
    
}: LayoutModalProps) => {
   
    const Icon = iconsModal[icon];
 const submit = () => {};
 const router = useRouter();

 const onClose = () => {
     router.back();
 };
  

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{ base: 'bg-base-100' }}
            placement='center'
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
                                <Button onClick={submit} content='Confirmar' />
                                <Button onClick={onClose} color='default' content='Cancelar' />
                            </ModalFooter>
                        )}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
