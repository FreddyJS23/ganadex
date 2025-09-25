import { SelectOptions } from "@/types";

type ConvertToSelecetOptionsParams = {
  id: number;
  [value: string]: string | number;
};

/**Convertir datos en un array de objetos SelectOptions
 * @param data Datos a convertir
 * @returns Array de objetos SelectOptions
 */
export const converToSelectOptions = (
  data: ConvertToSelecetOptionsParams[],
): SelectOptions[] => {
  const itemsSelect: { value: string | number; label: string | number }[] = [];

  data.map((items) => {
    const [id, item] = Object.entries(items);
    const keyIdObject = id[0];
    const keyItemObject = item[0];

    itemsSelect.push({
      value: items[keyIdObject],
      label:
        typeof items[keyItemObject] == "number"
          ? items[keyItemObject].toString()
          : items[keyItemObject],
    });
  });
  return itemsSelect;
};
