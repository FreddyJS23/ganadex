import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps, PreciosDeLeche } from '@/types';
import { Select } from '@/components/select';

export const ModalSaleMilk = ({
    isOpen,
    onOpen,
    onOpenChange,
    selectPrecios,
}: ModalProps & { selectPrecios: PreciosDeLeche[] }) => {
    const itemsSelect: { value: string | number; label: string }[] = [];

    selectPrecios.map(({ id, precio }) =>
        itemsSelect.push({ value: id, label: precio.toString() }),
    );

    return (
        <LayoutModal
            icon="milk"
            titleModal={'Venta de leche'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <form action="" method="post" className="m-auto flex flex-col gap-4 w-2/4 ">
                <Input
                    id="lecheKg"
                    label="Kilogramos"
                    required
                    type="number"
                    endContent="weight-milk"
                    size="lg"
                />
                <Select
                    id="precio"
                    label="Precio"
                    required
                    description="Precios disponibles por kg, creados previamente"
                    items={itemsSelect}
                    endContent='dolar'

                />
            </form>
        </LayoutModal>
    );
};
