import { iconsModal } from '@/collections/iconsModal';
import { IconsModal,LayoutModalProps,TitlesModals } from '@/types';
import { Button } from '@/ui/Button';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/modal';


export const LayoutModal = ({
    titleModal,
    dataHeader,
    icon,
    footer,
    children,
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
  
    
}: LayoutModalProps) => {
   
    const Icon = iconsModal[icon];

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{ base: 'bg-base-100' }}
            placement='center'
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
                                <Button content='Confirmar' />
                                <Button color='default' content='Cancelar' />
                            </ModalFooter>
                        )}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
