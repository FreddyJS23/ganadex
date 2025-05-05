import { DetailsProps } from "@/types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

export const Details = ({ tittle, content:contentProp }: DetailsProps) => {
  
  const content=typeof contentProp == "string" ? capitalizeFirstLetter(contentProp) : contentProp
  return (
    <div>
      <h4 className="font-bold text-lg">{tittle}</h4>
      <p className="text-base text-balance">{content}</p>
    </div>
  );
};
