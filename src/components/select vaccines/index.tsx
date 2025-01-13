import { AvailableVaccines } from '@/types';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { Select, SelectItem, SelectSection,Selection } from '@nextui-org/react';
import { useEffect, useState } from 'react';


type SelectVaccinesProps = {
    vaccinesSelect: AvailableVaccines[];
    isInvalidSelect: boolean;
    setValueSelect: React.Dispatch<React.SetStateAction<number | null>>;
    valueSelect:number | null
};

export const SelectVaccines = ({
    vaccinesSelect,
    isInvalidSelect,
    setValueSelect,
    valueSelect
}: SelectVaccinesProps) => {
    const groupByTipoAnimal = (vaccinesSelect: AvailableVaccines[]) => {
        const tipoAnimal: string[] = [];
        vaccinesSelect.forEach(({ tipo_animal }) => {
          tipoAnimal.includes(tipo_animal.toString()) ? null : tipoAnimal.push(tipo_animal.toString());
        });
        return tipoAnimal;
    };
   
    useEffect(() => {
    valueSelect == null && setValue(new Set([])); 
    }, [valueSelect])
    

    const [value, setValue] = useState<Selection>(new Set([]));

    return (
        <Select
            id={'vacuna_id'}
            label={'Vacunas'}
            color={`${isInvalidSelect ? 'danger' : 'primary'}`}
            isInvalid={isInvalidSelect}
            variant="underlined"
            selectedKeys={value}
            description={'vacunas'}
            onSelectionChange={(keys) => {
                setValue(keys);
                setValueSelect(parseInt(Array.from(keys)[0] as string));
            }}
            classNames={{
                label: 'text-current font-bold',
                value: 'text-current',
                popoverContent: 'bg-base-100',
            }}
        >
            {groupByTipoAnimal(vaccinesSelect).map((tipoAnimalGroupBy) => (
                <SelectSection
                    key={tipoAnimalGroupBy}
                    title={capitalizeFirstLetter(tipoAnimalGroupBy)}
                >
                    {vaccinesSelect
                        .filter(
                            ({ tipo_animal }) =>
                                tipo_animal.toString() ==
                                tipoAnimalGroupBy,
                        )
                        .map((vaccine) => (
                            <SelectItem key={vaccine.id}>
                                {vaccine.nombre}
                            </SelectItem>
                        ))}
                </SelectSection>
            ))}
        </Select>
    );
};
