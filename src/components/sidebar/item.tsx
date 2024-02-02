import IconoFlechaDerecha from "@/icons/icono-flecha_derecha.svg";
import Link from "next/link";
import {  SidebarElementProps } from "@/types";
import { iconsSidebar, optionsSubmenuSidebar } from "@/collections";


const optionsSubmenu = () => {
  return optionsSubmenuSidebar.map(({ link, option }, index) => (
    <li
      key={index}
      className="flex p-2 items-center rounded gap-3 hover:bg-base-200 transition-colors duration-75"
    >
      <Link key={index} className="" href={link}>
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
}: SidebarElementProps) => {
  
  /* icono dinamico de opcion del sidebar */
  const Icon = iconsSidebar[icon];

  return (
    <>
      <li
        tabIndex={0}
        className={`${
          responsive ? "dropdown dropdown-right" : "collapse group"
        }    rounded-none transition-none`}
      >
        {/*   elemento */}
        <div className="flex p-2 pl-4 pr-4 items-center border-l-4 border-l-transparent gap-3  hover:bg-base-200 hover:border-l-primary  group-focus:bg-base-200 group-focus:border-l-primary transition-colors duration-75">
         
          {/*  Icono del elemento */}
          <div className="size-7">{<Icon />}</div>

          <span className="sm:max-lg:hidden  basis-2/3">{element}</span>

          {optionMultiple && (
            <IconoFlechaDerecha className="w-2 h-3 group-focus:rotate-90 cursor-pointer transition-transform duration-75" />
          )}
        </div>

        {/*  submenu */}
        {optionMultiple && (
          <ul
            tabIndex={1}
            className={` ${
              responsive ? "dropdown-content bg-base-100 p-2 rounded" : "collapse-content mt-2"
            }`}
          >
            {optionsSubmenu()}
          </ul>
        )}

        {/*   submenu ganado */}
        {optionCattle && (
          <ul
            className={`${
              responsive ? "dropdown-content bg-base-100 p-2 rounded " : "collapse-content mt-2"
            }`}
          >
            {optionsSubmenu()}

            <li className="flex p-2 items-center rounded gap-3  hover:bg-base-200 transition-colors duration-75">
              <Link className="" href={""}>
                Pesaje de leche
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
                {optionsSubmenu()}
              </ul>
            </li>
          </ul>
        )}
      </li>
    </>
  );
};
