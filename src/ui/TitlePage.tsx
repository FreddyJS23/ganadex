import { Tooltip } from "@/components/tooltip";
import { TooltipsProps } from "@/types";

type TitlePageProps = {
  title: string;
  iconTooltip?: boolean;
  contentTooltip?: TooltipsProps["content"];
  placement?: TooltipsProps["placement"];
};

export const TitlePage = ({
  title,
  contentTooltip,
  iconTooltip,
  placement = "right",
}: TitlePageProps) => {
  return iconTooltip ? (
    contentTooltip && (
      <div className="flex justify-center items-center gap-2">
        <h3 className="font-bold text-2xl w-fit">{title}</h3>
        <Tooltip content={contentTooltip} placement={placement} type="icon" />
      </div>
    )
  ) : (
    <h3 className="font-bold text-2xl m-auto w-fit">{title}</h3>
  );
};
