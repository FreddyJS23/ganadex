import {
    Table,
    TableColumn,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
    Selection,
} from '@nextui-org/table';
import { useAsyncList } from '@react-stately/data';
import { SortDescriptor } from '../../../node_modules/@react-aria/overlays/node_modules/@react-types/shared';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { statusOptions } from '@/collections/statusCattleCollection';
import { EstadosGanado, Hacienda, StateCattle } from '@/types';
import IconFlechaDerecha from '@/icons/icono-flecha_derecha.svg';
import IconSearch from '@/icons/icono-buscar.svg';
import { useSession } from 'next-auth/react';

type TableComponentProps<T> = {
    type: string;
    columnsCollection: { key: string; label: string }[];
    items: T[];
    renderCell: (item: T, columnKey: keyof T) => React.ReactNode;
};

export const TableComponent = <T extends { id: number }>({
    type,
    columnsCollection,
    items,
    renderCell,
}: TableComponentProps<T>) => {
    /* -------------------------- ordenamiento columnas ------------------------- */
    const list = useAsyncList({
        async load() {
            return {
                items: items,
            };
        },
        async sort({ items, sortDescriptor: Sort }) {
            return {
                items: items.sort((a, b) => {
                    //Adaptar el tipo
                    const sortDescriptor = Sort as {
                        column: keyof T;
                        direction: SortDescriptor['direction'];
                    };
                    // Comparar los items por la columna ordenada
                    const first = a[sortDescriptor.column];
                    const second = b[sortDescriptor.column];

                    let compare;
                    //usar una comparacion optima para string si son strings
                    if (
                        typeof first === 'string' &&
                        typeof second === 'string'
                    ) {
                        compare = first.localeCompare(second);
                    } else
                        compare =
                            parseInt(first as string) <
                            parseInt(second as string)
                                ? -1
                                : 1;

                    // cortar el orden si se especifica descending
                    if (sortDescriptor.direction === 'descending') {
                        compare *= -1;
                    }
                    return compare;
                }),
            };
        },
    });

    useEffect(() => {
      list.reload()
    
    }, [items])
    

    /* --------------------------------- refrescar cuando cambia -------------------------------- */
    items.length > list.items.length || items.length < list.items.length && list.reload()
    
    /* --------------------------------- buscador y filtro por estados -------------------------------- */
    const [filterValue, setFilterValue] = useState('');
    const [statusFilter, setStatusFilter] = useState<Selection>('all');
    const [personalFilter, setPersonalFilter] = useState<Set<'all' | 'some'>>(new Set<'all' | 'some'>(['all']));
    const  nameHacienda=useSession().data?.user.hacienda?.nombre

    let typeFilter: 'none' | 'numero' | 'nombre' | 'codigo' = 'none';
    let filterStateActive = false;
    let filterHaciendaActive = false;
 
    if(items.length > 0){
        if('numero' in items[0]) typeFilter = 'numero';
        else if('nombre' in items[0])  typeFilter = 'nombre';
        else if('codigo' in items[0])  typeFilter = 'codigo';

        if('estados' in items[0]) filterStateActive = true;

        if('haciendas' in items[0]) filterHaciendaActive = true;
        
   }

    const hasSearchFilter = Boolean(filterValue);

    const onSearchChange = useCallback((value: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    const filteredData = useMemo(() => {
        let filteredItems = [...list.items];
        
        //evitar error al querer leer un array vacio
        if(filteredItems.length == 0) return filteredItems
        
        //filtro si incluye la columna numero
        if (typeFilter == 'numero') {
            if (hasSearchFilter) {
                const filteredItemsWithNumber = filteredItems as Array<
                    T & { numero: number }
                >;
                filteredItems = filteredItemsWithNumber.filter((item) =>
                    item.numero.toString().includes(filterValue.toString()),
                );
            }
        }
        //filtro si incluye la columna nombre
        else if (typeFilter == 'nombre') {
            if (hasSearchFilter) {
                const filteredItemsWithNombre = filteredItems as Array<
                    T & { nombre: string }
                >;
                filteredItems = filteredItemsWithNombre.filter((item) =>
                    item.nombre
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()),
                );
            }
        }
        //filtro si incluye la columna codigo
        else if (typeFilter == 'codigo') {
            if (hasSearchFilter) {
                const filteredItemsWithNombre = filteredItems as Array<
                    T & {codigo: string }
                >;
                filteredItems = filteredItemsWithNombre.filter((item) =>
                    item.codigo
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()),
                );
            }
        }
        
        //filtro por estados
            if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
                const filteredItemsWithStates = filteredItems as Array<
                    T & { estados: EstadosGanado[] }
                >;
                const statusFilterArray = Array.from(statusFilter) as Array<
                    keyof typeof StateCattle
                >;
                filteredItems = filteredItemsWithStates.filter((item) =>
                    item.estados.some(({ estado }) =>
                        statusFilterArray.includes(estado),
                    ),
                );
            }
        
        //filtro por hacienda para ver todo personal o solo de la hacienda actual
        if (filterHaciendaActive && Array.from(personalFilter)[0] == 'some') {

            //añadir atributo al tipo de los items para tener mejorar el tipado
            const filteredItemsWithHacienda = filteredItems as Array<
                T & { haciendas: Hacienda[]}
            >;
            
            console.log(filteredItemsWithHacienda)
                filteredItems = filteredItemsWithHacienda.filter((item) =>
                    item.haciendas.some(({ nombre }) => 
                        nombre.toLowerCase() == nameHacienda.toLowerCase())
                        
                );
            
          
        }

        return filteredItems;
    }, [list.items, typeFilter, statusFilter, filterHaciendaActive, personalFilter, hasSearchFilter, filterValue]);

    /* -------------------------------- paginado -------------------------------- */
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(filteredData.length / rowsPerPage);

    const itemsBodyTable = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredData.slice(start, end);
    }, [page, filteredData]);

    return (
        <div className='flex flex-col w-full '>
            <div className="flex gap-8">
               {/* Buscador */}
               {typeFilter != 'none' && <Input
                    isClearable
                    startContent={<IconSearch className="w-4 h-4" />}
                    color='primary'
                    classNames={{
                        base: 'w-52',
                        inputWrapper: 'border-1',
                    }}
                    placeholder={`Buscar por ${typeFilter}`}
                    size="sm"
                    value={filterValue}
                    variant="bordered"
                    onClear={() => setFilterValue('')}
                    onValueChange={onSearchChange}
                />}
                {/* Selecion de estados */}
               {filterStateActive && <Dropdown
                    classNames={{ base: 'bg-base-100', content: 'bg-base-100' }}
                >
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            variant="flat"
                            endContent={
                                <IconFlechaDerecha className="w-4 h-4 text-primary rotate-90" />
                            }
                        >
                            Estados de ganado
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={statusFilter}
                        selectionMode="multiple"
                        onSelectionChange={(key) => {
                            console.log(key);
                            setStatusFilter(key);
                        }}
                        classNames={{ base: 'bg-base-100' }}
                    >
                        {statusOptions.map((status) => (
                            <DropdownItem
                                key={status.estado}
                                className="capitalize"
                            >
                                {status.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>}
               
               
                {/* Selecion hacienda actual y todas las haciendas personal*/}
               {filterHaciendaActive && <Dropdown
                    classNames={{ base: 'bg-base-100', content: 'bg-base-100' }}
                >
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            variant="flat"
                            endContent={
                                <IconFlechaDerecha className="w-4 h-4 text-primary rotate-90" />
                            }
                        >
                           Filtrar
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="filter personal by hacienda"
                        closeOnSelect={false}
                        selectedKeys={personalFilter}
                        selectionMode="single"
                        onSelectionChange={(key) => {
                            console.log(key);
                            setPersonalFilter(key);
                        }}
                        classNames={{ base: 'bg-base-100' }}
                    >
                        {[
                            { id: 'all', filter: 'all', label: 'Todos' },
                            { id: 'some', filter: 'some', label: 'Hacienda actual' },
                        ].map((filter) => (
                            <DropdownItem
                                key={filter.id}
                                className="capitalize"
                            >
                                {filter.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>}
            </div>

            <Table
                aria-label={`Table ${type}`}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            showControls
                            variant="bordered"
                            showShadow
                            color="primary"
                            page={page}
                            size="lg"
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: 'bg-base-100',
                    th: 'bg-base-200 font-bold text-current',
                }}
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort as (descriptor: SortDescriptor) => void}
            >
                <TableHeader columns={columnsCollection}>
                    {({ key, label }) => (
                        <TableColumn allowsSorting={true} key={key}>
                            {label}
                        </TableColumn>
                    )}
                </TableHeader>
                {items.length >= 1 ? (
                    <TableBody items={itemsBodyTable}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey as keyof T)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                ) : (
                    <TableBody emptyContent={'Sin registros'}>{[]}</TableBody>
                )}
            </Table>
        </div>
    );
};
