import { DetailsProps } from "@/types";

export const Details = ({ tittle, content }: DetailsProps) => {
  return (
    <div>
      <h4 className="font-bold text-lg">{tittle}</h4>
      <p className="text-base text-balance">{content}</p>
    </div>
  );
};
