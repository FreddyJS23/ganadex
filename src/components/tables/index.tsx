import {
  Table,
  TableColumn,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  type Selection,
} from "@nextui-org/table";
import { useAsyncList } from "@react-stately/data";
import type { SortDescriptor } from "../../../node_modules/@react-aria/overlays/node_modules/@react-types/shared";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
} from "@nextui-org/react";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { statusOptions } from "@/collections/statusCattleCollection";
import {
  type EstadosGanado,
  type Ganado,
  type Hacienda,
  type Partos,
  Servicios,
  type StateCattle,
  type TypesCattle,
} from "@/types";
import IconFlechaDerecha from "@/icons/icono-flecha_derecha.svg";
import IconSearch from "@/icons/icono-buscar.svg";
import { useSession } from "next-auth/react";
import { types } from "util";
import { typeCasttleSelect } from "@/collections/typeCastleSelect";

type TableComponentBaseProps<T> = {
  type: string;
  columnsCollection: { key: string; label: string }[];
  items: T[];
  renderCell: (item: T, columnKey: keyof T) => React.ReactNode;
  /** 
   * @default false
    */
  filterSexCattle?: boolean;
};

type TableWithSelectionProps<T> = TableComponentBaseProps<T> & {
  setSelectedIdItems: Dispatch<SetStateAction<Array<number> | null>>;
};

type TableComponentProps<T> =
  | (TableComponentBaseProps<T> & { selectionMode?: "none" })
  | (TableWithSelectionProps<T> & { selectionMode: "multiple" });

export const TableComponent = <T extends { id: number }>(
  props: TableComponentProps<T>,
) => {
  const { columnsCollection, items, renderCell, type, filterSexCattle:filterSexProp=false } = props;

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
            direction: SortDescriptor["direction"];
          };
          // Comparar los items por la columna ordenada
          const first = a[sortDescriptor.column];
          const second = b[sortDescriptor.column];

          let compare;
          //usar una comparacion optima para string si son strings
          if (typeof first === "string" && typeof second === "string") {
            compare = first.localeCompare(second);
          } else
            compare =
              Number.parseInt(first as string) <
              Number.parseInt(second as string)
                ? -1
                : 1;

          // cortar el orden si se especifica descending
          if (sortDescriptor.direction === "descending") {
            compare *= -1;
          }
          return compare;
        }),
      };
    },
  });

  useEffect(() => {
    list.reload();
  }, [items]);

  /* --------------------------------- refrescar cuando cambia -------------------------------- */
  items.length > list.items.length ||
    (items.length < list.items.length && list.reload());

  /* ------------------ selección de varias filas en la tabla ----------------- */

  const getIdfromSelectedKeys = (selectedKeys: Selection) => {
    const idArray = Array.from(selectedKeys).map((key) => {
     
      // Busca el elemento original siendo la key el id del elemento
      const selectedItem =
       items.find((item) => item.id.toString() === key) as T & { ganado_id?: number };
      //no se encontró el elemento, devolver undefined
      if (selectedItem == undefined) return 1;
      //si es un ganado descarte o toro tiene la propiedad ganado_id haciendo referencia al id de la tabla principal, devolver el id del ganado de la tabla principal
      if ("ganado_id" in selectedItem) return selectedItem.ganado_id as number;
      
      return selectedItem.id; // Devuelve el ID original
    });

    return idArray;
  };

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  //props condicionales, se usan para que se puedan pasar props de un componente que no tiene seleccion
  let selectionMode: TableComponentProps<T>["selectionMode"] = "none";
  let setSelectedIdItems: TableWithSelectionProps<T>["setSelectedIdItems"];
  //chequear para no tener errores con typescript
  if (props.selectionMode == "multiple") {
    selectionMode = props.selectionMode;
    setSelectedIdItems = props.setSelectedIdItems;
  }

  /* --------------------------------- buscador y filtro por estados -------------------------------- */
  const [filterValue, setFilterValue] = useState("");
  /* el tipo selection de nextui permite seleccionar todo el set con el string (all) */
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  //filtro aplicado a la tabla de partos
  const [statusBirthFilter, setstatusBirthFilter] = useState<Selection>("all");
  const [typesCastleFilter, setTypesCastleFilter] = useState<Selection>("all");
  const [sexFilter, setSexFilter] = useState<Selection>("all");
  const [pendingFilter, setPendingFilter] = useState<Selection>("all");
  const [personalFilter, setPersonalFilter] = useState<Set<"all" | "some">>(
    new Set<"all" | "some">(["all"]),
  );
  const nameHacienda = useSession().data?.user.hacienda?.nombre;

  let typeFilter: "none" | "número" | "nombre" | "código" = "none";
  let filterStateActive = false;
  let filterHaciendaActive = false;
  let filterTypesCattle = false;
  let filterSexCattle = false;
  let filterPendingOperation = false;
  let filterTypeBirhtStates = false;

  if (items.length > 0) {
    if ("numero" in items[0]) typeFilter = "número";
    else if ("nombre" in items[0]) typeFilter = "nombre";
    else if ("codigo" in items[0]) typeFilter = "código";

    if ("estados" in items[0]) filterStateActive = true;

    if ("haciendas" in items[0]) filterHaciendaActive = true;

    if ("tipo" in items[0]) filterTypesCattle = true;

    if ("sexo" in items[0] && filterSexProp) filterSexCattle = true;

    if ("pendiente" in items[0]) filterPendingOperation = true;

    if ("estado" in items[0] && "ultimo_parto" in items[0])
      filterTypeBirhtStates = true;
  }

  const hasSearchFilter = Boolean(filterValue);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredData = useMemo(() => {
    let filteredItems = [...list.items];

    //evitar error al querer leer un array vacio
    if (filteredItems.length == 0) return filteredItems;

    //filtro si incluye la columna numero
    if (typeFilter == "número") {
      if (hasSearchFilter) {
        const filteredItemsWithNumber = filteredItems as Array<
          T & { numero: number | null }
        >;
        filteredItems = filteredItemsWithNumber.filter((item) =>
          item.numero ? item.numero.toString().includes(filterValue.toString()) : false,
        );
      }
    }
    //filtro si incluye la columna nombre
    else if (typeFilter == "nombre") {
      if (hasSearchFilter) {
        const filteredItemsWithNombre = filteredItems as Array<
          T & { nombre: string }
        >;
        filteredItems = filteredItemsWithNombre.filter((item) =>
          item.nombre.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
    }
    //filtro si incluye la columna codigo
    else if (typeFilter == "código") {
      if (hasSearchFilter) {
        const filteredItemsWithNombre = filteredItems as Array<
          T & { codigo: string }
        >;
        filteredItems = filteredItemsWithNombre.filter((item) =>
          item.codigo.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
    }

    //filtro por estados
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      const filteredItemsWithStates = filteredItems as Array<
        T & { estados: EstadosGanado[] }
      >;
      const statusFilterArray = Array.from(statusFilter) as Array<
        keyof typeof StateCattle
      >;
      filteredItems = filteredItemsWithStates.filter((item) =>
        item.estados.some(({ estado }) => statusFilterArray.includes(estado)),
      );
    }

    //filtro por hacienda para ver todo personal o solo de la hacienda actual
    if (filterHaciendaActive && Array.from(personalFilter)[0] == "some") {
      //añadir atributo al tipo de los items para tener mejorar el tipado
      const filteredItemsWithHacienda = filteredItems as Array<
        T & { haciendas: Hacienda[] }
      >;

      filteredItems = filteredItemsWithHacienda.filter((item) =>
        item.haciendas.some(
          ({ nombre }) => nombre.toLowerCase() == nameHacienda.toLowerCase(),
        ),
      );
    }

    //filtro por tipo de ganado
    if (typesCastleFilter != "all") {
      //añadir atributo al tipo de los items para mejorar el tipado
      const filteredItemsWithType = filteredItems as Array<
        T & { tipo: keyof typeof TypesCattle }
      >;
      /* trasformar el set del select tipo de ganado
             en un array para poder usar el includes */
      const typesCattleFiltered = Array.from(typesCastleFilter) as Array<
        keyof typeof TypesCattle
      >;

      filteredItems = filteredItemsWithType.filter((item) =>
        /* filtrar el ganado por el tipo seleccionado en el select */
        typesCattleFiltered.includes(item.tipo),
      );
    }

    if (sexFilter != "all") {
      const filteredItemsWithSex = filteredItems as Array<
        T & { sexo: Ganado["sexo"] }
      >;
      const sexFilterArray = Array.from(sexFilter) as Array<Ganado["sexo"]>;
      filteredItems = filteredItemsWithSex.filter((item) =>
        /* filtrar el ganado por el tipo seleccionado en el select */
        sexFilterArray.includes(item.sexo),
      );
    }

    //filtro tablas revision y servicio para ver esta pendiente de operacion
    if (pendingFilter != "all") {
      const filteredItemsWithPending = filteredItems as Array<
        T & { pendiente: boolean }
      >;
      //convertir en booleano opciones del select (si|no)
      const pendingFilterArray = Array.from(pendingFilter)[0] == "si";
      filteredItems = filteredItemsWithPending.filter(
        (item) =>
          //filtrar el ganado si esta pendiente del estado de la operacion (revision,servicio o parto)
          item.pendiente == pendingFilterArray,
      );
    }
    //filtro tablas parto estados
    if (statusBirthFilter != "all") {
      const filteredItemsWithStatesBirth = filteredItems as Array<
        T & { estado: Partos["estado"] }
      >;
      //convertir en booleano opciones del select (si|no)
      const statusBirthFilterSelected = Array.from(
        statusBirthFilter,
      )[0] as Partos["estado"];

      filteredItems = filteredItemsWithStatesBirth.filter(
        (item) =>
          //filtrar vacas por su estado de parto
          item.estado == statusBirthFilterSelected,
      );
    }

    return filteredItems;
  }, [
    list.items,
    typeFilter,
    statusFilter,
    filterHaciendaActive,
    personalFilter,
    hasSearchFilter,
    filterValue,
    typesCastleFilter,
    sexFilter,
    pendingFilter,
    statusBirthFilter,
  ]);

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
    <div className="flex flex-col w-full ">
      <div className="flex gap-8">
        {/* Buscador */}
        {typeFilter != "none" && (
          <Input
            isClearable
            startContent={<IconSearch className="w-4 h-4" />}
            color="primary"
            classNames={{
              base: "w-52",
              inputWrapper: "border-1",
            }}
            placeholder={`Buscar por ${typeFilter}`}
            size="sm"
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        )}
        {/* Selecion de estados */}
        {filterStateActive && (
          <Dropdown
            classNames={{ base: "bg-base-100", content: "bg-base-100" }}
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
                setStatusFilter(key);
              }}
              classNames={{ base: "bg-base-100" }}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.estado}>{status.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}

        {/* Selecion de tipos de ganado */}
        {filterTypesCattle && (
          <Dropdown
            classNames={{ base: "bg-base-100", content: "bg-base-100" }}
          >
            <DropdownTrigger className="hidden sm:flex">
              <Button
                variant="flat"
                endContent={
                  <IconFlechaDerecha className="w-4 h-4 text-primary rotate-90" />
                }
              >
                Tipos
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={typesCastleFilter}
              selectionMode="multiple"
              onSelectionChange={(key) => {
                setTypesCastleFilter(key);
              }}
              classNames={{ base: "bg-base-100" }}
            >
              {typeCasttleSelect.map((type) => (
                <DropdownItem
                  /*se utiliza el label como key, ya que el filtrado se hace por el nombre del tipo */
                  key={type.label}
                  className="capitalize"
                >
                  {type.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}

        {/* Selecion de sexo ganado */}
        {filterSexCattle && (
          <Dropdown
            classNames={{ base: "bg-base-100", content: "bg-base-100" }}
          >
            <DropdownTrigger className="hidden sm:flex">
              <Button
                variant="flat"
                endContent={
                  <IconFlechaDerecha className="w-4 h-4 text-primary rotate-90" />
                }
              >
                Sexo
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={sexFilter}
              selectionMode="multiple"
              onSelectionChange={(key) => {
                setSexFilter(key);
              }}
              classNames={{ base: "bg-base-100" }}
            >
              {[
                { sexo: "H", label: "Hembras" },
                { sexo: "M", label: "Machos" },
              ].map(({ label, sexo }) => (
                <DropdownItem
                  /*se utiliza el label como key, ya que el filtrado se hace por el nombre del tipo */
                  key={sexo}
                  className="capitalize"
                >
                  {label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}

        {/* Selecion hacienda actual y todas las haciendas personal*/}
        {filterHaciendaActive && (
          <Dropdown
            classNames={{ base: "bg-base-100", content: "bg-base-100" }}
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
                setPersonalFilter(key);
              }}
              classNames={{ base: "bg-base-100" }}
            >
              {[
                { id: "all", filter: "all", label: "Todos" },
                { id: "some", filter: "some", label: "Hacienda actual" },
              ].map((filter) => (
                <DropdownItem key={filter.id} className="capitalize">
                  {filter.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}

        {/* Selecion pendiente de una operacion(revision, servicio) */}
        {filterPendingOperation && (
          <Dropdown
            classNames={{ base: "bg-base-100", content: "bg-base-100" }}
          >
            <DropdownTrigger className="hidden sm:flex">
              <Button
                variant="flat"
                endContent={
                  <IconFlechaDerecha className="w-4 h-4 text-primary rotate-90" />
                }
              >
                {`Pendiente ${type}`}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="filter by pending operation"
              closeOnSelect={false}
              selectedKeys={pendingFilter}
              selectionMode="single"
              onSelectionChange={(key) => {
                setPendingFilter(key);
              }}
              classNames={{ base: "bg-base-100" }}
            >
              {[
                { id: "si", label: "Si" },
                { id: "no", label: "No" },
              ].map((filter) => (
                <DropdownItem key={filter.id} className="capitalize">
                  {filter.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}

        {/* Selecion estados en partos */}
        {filterTypeBirhtStates && (
          <Dropdown
            classNames={{ base: "bg-base-100", content: "bg-base-100" }}
          >
            <DropdownTrigger className="hidden sm:flex">
              <Button
                variant="flat"
                endContent={
                  <IconFlechaDerecha className="w-4 h-4 text-primary rotate-90" />
                }
              >
                Estado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="filter by pending operation"
              closeOnSelect={false}
              selectedKeys={statusBirthFilter}
              selectionMode="single"
              onSelectionChange={(key) => {
                Array.from(key)[0] == "all"
                  ? setstatusBirthFilter("all")
                  : setstatusBirthFilter(key);
              }}
              classNames={{ base: "bg-base-100" }}
            >
              {[
                { id: "all", filter: "all", label: "Todos" },
                { id: "Vacia", label: "Vacias" },
                { id: "Gestacion", label: "Gestando" },
                { id: "Vendida", label: "Vendidas" },
                { id: "Fallecida", label: "Fallecidas" },
              ].map((filter) => (
                <DropdownItem key={filter.id} className="capitalize">
                  {filter.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>

      <Table
        aria-label={`Table ${type}`}
        selectedKeys={selectedKeys}
        selectionMode={selectionMode}
        onSelectionChange={(keys) => {
          setSelectedKeys(keys);
          //caso de seleccionar todas las filas, se devuelve null
          if (keys == "all") return setSelectedIdItems(null);
          const ids: number[] = getIdfromSelectedKeys(keys); // Obtener los IDs originales
          setSelectedIdItems(ids); // Actualizar el estado con los IDs originales
        }}
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
          wrapper: "bg-base-100",
          th: "bg-base-200 font-bold text-current",
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
        {items.length >= 1 && itemsBodyTable.length > 0 ? (
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
          <TableBody emptyContent={"Sin registros"}>{[]}</TableBody>
        )}
      </Table>
    </div>
  );
};
