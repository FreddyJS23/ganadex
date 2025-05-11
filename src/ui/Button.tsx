import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { Button as ButtonNextUI } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

type ButtonProps = {
  content: string | JSX.Element;
  color?:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  form?: string;
  title?: string;
  /**Indica si el botón se encuentra en un modal, para asi activar un loading, ya que el pending no se aplica en modals */
  buttonInModal?: boolean;
};

export const Button = ({
  content,
  color,
  onClick,
  type = "button",
  form,
  title,
  buttonInModal,
}: ButtonProps) => {
  
  const { pending } = useFormStatus();
  
  const { isLoading } = useLoadingButtonModal();
  if (form) {
    return (
      <ButtonNextUI
        onClick={onClick}
        className="w-full"
        color={`${color ? color : "primary"}`}
        type={type}
        isLoading={type == "submit" && buttonInModal ? isLoading : pending}
        form={form}
        title={title}
      >
        {content}
      </ButtonNextUI>
    );
  } else {
    return (
      <ButtonNextUI
        onClick={onClick}
        className="w-full"
        color={`${color ? color : "primary"}`}
        type={type}
        isLoading={type == "submit" && buttonInModal ? isLoading : pending}
        title={title}
      >
        {content}
      </ButtonNextUI>
    );
  }
};
