"use client";

import { InputProps, TipoRevision } from "@/types";
import {
  Select,
  SelectedItems,
  Selection,
  SelectItem,
  SelectSection,
} from "@nextui-org/react";

import { useState } from "react";

type SelectBullsProps = {
  id: string;
  label: string;
  items: TipoRevision[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  errors: InputProps["errors"];
  required: boolean;
};

export const SelectChecksType = ({
  id,
  label,
  items,
  field,
  errors,
  required,
}: SelectBullsProps) => {
  const [value, setValue] = useState<Selection>(new Set([]));
  return (
    <Select
      {...field}
      id={id}
      label={label}
      items={items}
      variant="underlined"
      size="sm"
      isInvalid={errors[id] && true}
      errorMessage={errors[id] && (errors[id]?.message as string)}
      color="primary"
      required={required}
      selectedKeys={value}
      onSelectionChange={(keys) => {
        setValue(keys);
      }}
      classNames={{
        label: "text-current font-bold",
        value: "text-current",
        popoverContent: "bg-base-100",
      }}
      //componente mostrado en el select
      renderValue={(items: SelectedItems<TipoRevision>) => {
        return items.map((item) => (
          <div key={id} className="flex gap-2">
            {item.data?.codigo && (
              <div className="flex gap-1">
                <span className="text-primary font-bold">
                  {item.data?.codigo}
                </span>
                <span className="opacity-50">:</span>
              </div>
            )}
            <span className="">{item.data?.tipo}</span>
          </div>
        ));
      }}
    >
      {({ id, tipo, codigo }: TipoRevision) => (
        <SelectItem key={id} textValue={tipo}>
          <div className="flex gap-2">
            {codigo && (
              <div className="flex gap-1">
                <span className="text-primary font-bold">{codigo}</span>
                <span className="opacity-50">:</span>
              </div>
            )}
            <span className="">{tipo}</span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
