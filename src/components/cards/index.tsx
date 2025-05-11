import IconPreñada from "@/icons/icono-preñadas.svg";
import IconServicio from "@/icons/icono-servir.svg";
import IconRevision from "@/icons/icono-revision.svg";
import IconPersonal from "@/icons/icono-personal.svg";
import IconFlechaEstadoDolar from "@/icons/icono-flechaEstadoDolar.svg";
import { DropDownOptionsCardsDashboard } from "../dropdown options cards dashboard";
import { abbrevationMonths } from "@/collections/abbrevationMonths";
import { Tooltip } from "../tooltip";
import { isSameYear } from "date-fns/fp";

type ContentCardProp = {
  title:
    | "Vacas preñadas"
    | "Pendiente de servir"
    | "Pendiente de revision"
    | "Vacas en ordeño"
    | "Personal";
  icon: "pregnant" | "serve" | "checkUp" | "staff";
  data: string | number;
};

type ContentCardSaleCattleProp = {
  title: "Mejor comprador" | "Mejor venta" | "Peor venta";
  data: string | number;
  multipleOption?: boolean;
};

type ContentCardSaleMilkProp = {
  title: "Precio actual";
  /**Precio actual */
  value: number;
  /**Porcentaje de variación respecto al precio anterior del actual */
  variationValue: number;
  multipleOption?: boolean;
};

type ContentCardDayVaccinationProp = {
  title: string;
  type: string;
  date: Date;
};

export const CardDashboard = ({ title, data, icon }: ContentCardProp) => {
  const icons = {
    pregnant: <IconPreñada />,
    serve: <IconServicio />,
    checkUp: <IconRevision />,
    staff: <IconPersonal />,
  };

  return (
    <div className="w-40 p-2 gap-2 bg-base-100 shadow-cards flex flex-col md:w-full lg:w-full">
      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
        <div className="size-7 lg:order-2">{icons[icon]}</div>
        <div className="text-balance lg:hidden ">{title}</div>
        <span className="font-bold text-lg lg:order-1 font-bebasNue">
          {data}
        </span>
      </div>

      <div className="hidden text-balance lg:block">{title}</div>
    </div>
  );
};

export const CardDashboardSaleCattle = ({
  title,
  data,
  multipleOption,
}: ContentCardSaleCattleProp) => {
  return (
    <div className="w-40 p-2 gap-2 bg-base-100 shadow-cards flex flex-col ">
      <div className="flex">
        <div className="flex">
          <span>{title}</span>
          <Tooltip
            type="icon"
            content={"mejor_comprador"}
            placement="right"
            size="md"
          />
        </div>
        {multipleOption && <DropDownOptionsCardsDashboard tipo="comprador" />}
      </div>

      <span className="font-bold text-xl font-bebasNue">{`${data} ${typeof data == "number" ? "$" : ""}`}</span>
    </div>
  );
};

export const CardDashboardSaleMilk = ({
  title,
  value,
  variationValue,
  multipleOption,
}: ContentCardSaleMilkProp) => {
  const isNegative = Math.sign(variationValue);
  return (
    <div className="w-40 p-2 gap-2 bg-base-100 shadow-cards flex flex-col ">
      <div className="flex items-center justify-between">
        <span>{title}</span>
        {multipleOption && <DropDownOptionsCardsDashboard tipo="precio" />}
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl font-bebasNue">{`${value}$`}</span>
        <div className="flex gap-1">
          <span className="text-xs">{`${variationValue}`}</span>
          <span className="size-4">
            <IconFlechaEstadoDolar
              className={
                isNegative == -1 ? "text-red-500" : "rotate-180 text-green-500"
              }
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export const CardDashboardDayVaccination = ({
  title,
  date,
  type,
}: ContentCardDayVaccinationProp) => {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const sameYear = isSameYear(date, new Date());

  return (
    <div className=" p-6 ml-6 flex bg-base-100 shadow-cards">
      {/* zona izquierda */}
      {sameYear ? (
        <div className="flex flex-col items-center gap-2">
          <div className="text-xl font-bold">{abbrevationMonths[month]}</div>
          <div className="text-xl font-bold">{day}</div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-xs">{year}</div>
          <div className="text-base font-bold">{abbrevationMonths[month]}</div>
          <div className="text-sm font-bold">{day}</div>
        </div>
      )}
      {/* divider */}

      <div className="divider divider-horizontal divider-primary opacity-20"></div>

      {/* zona derecha */}
      <div className="flex flex-col gap-y-2">
        <div className="">{title}</div>
        <div className="flex flex-wrap space-x-1">
          <span className="opacity-50 ml-1">Tipo</span>
          {type.split(",").map((type, index) => (
            <span key={index}>{type}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
