type ConvertToSelecetOptionsParams = {
    id: number;
    [value: string]: string | number;
};

export const converToSelectOptions = (
    data: ConvertToSelecetOptionsParams[],
) => {
    const itemsSelect: { value: string | number; label: string | number }[] = [];

    data.map((items) => {
        const [id, item] = Object.entries(items);
        const keyIdObject = id[0];
        const keyItemObject = item[0];

        itemsSelect.push({
            value: items[keyIdObject],
            label:
                typeof items[keyItemObject] == 'number'
                    ? items[keyItemObject].toString()
                    : items[keyItemObject],
        });
    });
    return itemsSelect;
};
