import IconoFlechaDerecha from "@/icons/icono-flecha_derecha.svg";
import Link from "next/link";
import {  SidebarElementProps, URLS } from "@/types";
import { iconsSidebar, optionsSubmenuSidebar } from "@/collections";

type URL=keyof typeof URLS

const optionsSubmenu = (url:URL) => {
  return optionsSubmenuSidebar.map(({ link, option }, index) => (
    <li
      key={index}
      className="flex p-2 items-center rounded gap-3 hover:bg-base-200 transition-colors duration-75"
    >
      <Link key={index} className="" href={`${url}${link}`}>
        {option}
      </Link>
    </li>
  ));
};

export const SidebarElement = ({
  icon,
  element,
  optionMultiple,
  optionCattle,
  responsive,
  url
}: SidebarElementProps) => {
  
  /* icono dinamico de opcion del sidebar */
  const Icon = iconsSidebar[icon];

  return (
    <li>
      <details
        tabIndex={0}
        className={`${
          responsive ? "dropdown dropdown-right" : "collapse group"
        }    rounded-none transition-none`}
      >
        {/*   elemento */}
        <summary className="!flex p-2 pl-4 pr-4 items-center border-l-4 border-l-transparent gap-3  hover:bg-base-200 hover:border-l-primary  group-focus:bg-base-200 group-focus:border-l-primary transition-colors duration-75">
         
          {/*  Icono del elemento */}
          <div className={`size-7 ${!optionMultiple ? 'cursor-pointer' : ''}`}>{<Icon />}</div>

          <Link href={url} className="sm:max-lg:hidden  basis-2/3">{element}</Link>

          {optionMultiple && (
            <IconoFlechaDerecha className="w-2 h-3 group-open:rotate-90 cursor-pointer transition-transform duration-75" />
          )}
          {optionCattle && (
            <IconoFlechaDerecha className="w-2 h-3 group-open:rotate-90 cursor-pointer transition-transform duration-75" />
          )}
        </summary>

        {/*  submenu */}
        {optionMultiple && (
          <ul
            tabIndex={1}
            className={` ${
              responsive ? "dropdown-content bg-base-100 p-2 rounded" : "collapse-content mt-2"
            }`}
          >
            {optionsSubmenu(url)}
          </ul> 
        )}

        {/*   submenu ganado */}
        {optionCattle && (
          <ul
            className={`${
              responsive ? "dropdown-content bg-base-100 p-2 rounded " : "collapse-content mt-2"
            }`}
          >
             {optionsSubmenu(url)} 

            <li className="flex p-2 items-center rounded gap-3  hover:bg-base-200 transition-colors duration-75">
              <Link className="" href={""}>
                Pesaje de leche
              </Link>
            </li>
            <li className="flex p-2 items-center rounded gap-3  hover:bg-base-200 transition-colors duration-75">
              <Link className="" href={"/venta_ganado"}>
                Venta
              </Link>
            </li>

            {/* submenu becerros */}
            <li
              className={` ${
                responsive ? "dropdown dropdown-open" : "collapse collapse-open"
              } flex flex-col items-start  p-2 rounded gap-3 `}
            >
              <div className="flex items-center gap-3">
                <span>Becerros</span>
                <IconoFlechaDerecha
                  className={`${responsive ? "" : "rotate-90"} w-2 h-3 `}
                />
              </div>

              <ul
                className={`${
                  responsive ? "dropdown-content bg-base-100 p-2 rounded" : "collapse-content mt-1"
                }`}
              >
                {optionsSubmenu(url)}
              </ul>
            </li>
          </ul>
        )}
      </details>
    </li>
  );
};
