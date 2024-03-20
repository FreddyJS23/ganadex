import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { Comprador, ModalProps } from '@/types';
import { Select } from '@/components/select';

export const ModalSaleCattle = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    selectCompradores,
}: ModalProps & { selectCompradores: Comprador[] }) => {
    const itemsSelect: { value: string | number; label: string }[] = [];

    selectCompradores.map(({ id, nombre }) =>
        itemsSelect.push({ value: id, label: nombre }),
    );

    return (
        <LayoutModal
            icon="cattleV2"
            titleModal={'Venta de ganado'}
            footer={true}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <form
                action=""
                method="post"
                className="m-auto flex flex-col gap-4 w-2/4 "
            >
                <Input
                    id="price"
                    label="Precio"
                    required
                    type="number"
                    endContent="dolar"
                    size="lg"
                />
                <Select
                    id="comprador"
                    label="Compradores"
                    required
                    description="Compradores disponibles, creados previamente"
                    items={itemsSelect}
                />
            </form>
        </LayoutModal>
    );
};
