import { InputProps } from "@/types";
import { Input as InputNextUI } from "@nextui-org/input";

const EndElement = ({ content }: { content: "$" | "KG" | "ml" }) => {
  return (
    <div className="pointer-events-none flex items-center">
      <span className="text-default-400 text-small sm:text-base">
        {content}
      </span>
    </div>
  );
};

export const Input = ({
  id,
  label,
  type,
  description,
  required,
  endContent,
  size,
  register,
  errors,
  defaultValue,
  uppercase = false,
  variant = "underlined",
  placeholder = "",
}: InputProps) => {
  const endContents = {
    dolar: <EndElement content="$" />,
    weight: <EndElement content="KG" />,
    "weight-milk": <EndElement content="KG" />,
    "ml": <EndElement content="ml" />,
  };

  return (
    <InputNextUI
      id={id}
      color="primary"
      classNames={{
        label: "text-current font-bold",
        input: uppercase ? "text-current uppercase" : "text-current",
      }}
      variant={variant}
      type={type}
      label={label}
      placeholder={type == "date" ? " " : placeholder}
      description={description}
      isRequired={required}
      endContent={endContent && endContents[endContent]}
      size={size ? size : "md"}
      {...register(
        id,
        type == "number"
          ? {
              setValueAs: (value) =>
                value === "" ? undefined : parseInt(value, 10),
            }
          : {},
      )}
      isInvalid={errors[id] && true}
      errorMessage={errors[id] && (errors[id]?.message as string)}
      defaultValue={defaultValue}
      min={1}
    />
  );
};
