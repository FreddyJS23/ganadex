'use client';

import { formCastle } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Button } from '@/ui/Button';
import { TitlePage } from '@/ui/TitlePage';
import { Select as SelectNextUI, SelectItem } from '@nextui-org/select';
import { Chip } from '@nextui-org/chip';
import { Select } from '@/components/select';

export default function Page() {
    
     const submit = () => {};
    return (
        <>
            <TitlePage title="Registrar cabeza ganado" />

            <form
                action=""
                className="grid grid-cols-2 m-auto max-w-5xl p-1 gap-4 gap-y-7 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4 "
            >
                {formCastle.map(
                    ({
                        id,
                        label,
                        required,
                        type,
                        description,
                        select,
                        endContent,
                    }) => (
                        <>
                            {id != 'estado_id' && (
                                <div key={id}>
                                    {type != 'select' && (
                                        <Input
                                            id={id}
                                            label={label}
                                            required={required}
                                            type={type}
                                            description={description}
                                            endContent={endContent}
                                        />
                                    )}
                                    {/*  select normal */}
                                    {type == 'select' && select && (
                                        <Select
                                            id={id}
                                            items={select}
                                            label={label}
                                            required={required}
                                            description={description}
                                        />
                                    )}
                                </div>
                            )}

                            {/*   select multiple */}
                            {id == 'estado_id' && (
                                <div
                                    key={id}
                                    className="col-span-full md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-2"
                                >
                                    {
                                        <SelectNextUI
                                            label={label}
                                            items={select}
                                            selectionMode="multiple"
                                            variant="underlined"
                                            color="primary"
                                            size="lg"
                                            labelPlacement="outside"
                                            isRequired={required}
                                            classNames={{
                                                innerWrapper: 'h-fit',
                                                trigger: 'h-fit',
                                                label: 'top-4 text-current  font-bold',
                                                popoverContent: 'bg-base-100',
                                            }}
                                            renderValue={(items) => {
                                                return (
                                                    <div className="flex flex-wrap gap-2 p-2 md:p-4">
                                                        {items.map((item) => (
                                                            <Chip
                                                                color="primary"
                                                                key={item.key}
                                                                className="text-xs md:text-base"
                                                            >
                                                                {
                                                                    item.data
                                                                        ?.label
                                                                }
                                                            </Chip>
                                                        ))}
                                                    </div>
                                                );
                                            }}
                                        >
                                            {({ label, value }) => (
                                                <SelectItem key={value}>
                                                    {label}
                                                </SelectItem>
                                            )}
                                        </SelectNextUI>
                                    }
                                </div>
                            )}
                        </>
                    ),
                )}
                <div className="col-span-full md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-2">
                    <Button onClick={submit} content="Registrar" />
                </div>
            </form>
        </>
    );
}
