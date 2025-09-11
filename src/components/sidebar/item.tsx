import IconoFlechaDerecha from "@/icons/icono-flecha_derecha.svg";
import Link from "next/link";
import { SidebarElementProps, URLS } from "@/types";
import { iconsSidebar, optionsSubmenuSidebar } from "@/collections";

const optionsSubmenu = (url: URL) => {
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
  options,
  responsive,
  url,
}: SidebarElementProps) => {
  /* icono dinámico de opción del sidebar */
  const Icon = iconsSidebar[icon];

  return (
    <li className={`${url ? "" : "cursor-pointer"}`}>
      <details
        tabIndex={0}
        className={`${
          responsive ? "dropdown dropdown-right" : "collapse group"
        } rounded-none transition-none`}
      >
        {/*   elemento */}
        <summary
          className={`!flex ${responsive ? "my-1 p-2 pl-1 gap-1" : "p-2 pl-1 pr-4 gap-3"} items-center border-l-4 border-l-transparent   hover:bg-base-200 hover:border-l-primary  group-focus:bg-base-200 group-focus:border-l-primary transition-colors duration-75`}
        >
          {/*  Icono del elemento */}
          <div
            className={`${responsive ? "size-5" : "size-7"}  ${!options ? "cursor-pointer" : ""}`}
          >
            {<Icon />}
          </div>

          {url ? (
            <Link href={url} className="sm:max-lg:hidden  basis-2/3">
              {element}
            </Link>
          ) : (
            <div className="sm:max-lg:hidden  basis-2/3">{element}</div>
          )}

          {options && (
            <IconoFlechaDerecha className="w-2 h-3 group-open:rotate-90 cursor-pointer transition-transform duration-75" />
          )}
          {/* espacio para cubrir el hueco que dejara la flecha en opción que no tengan submenu */}
          {!options && <span className="w-2 h-3"></span>}
        </summary>

        {/*  submenu */}
        {options && (
          <ul
            tabIndex={1}
            className={` ${
              responsive
                ? "dropdown-content bg-base-100 p-2 rounded"
                : "collapse-content mt-2"
            }`}
          >
            {options.map(({ option, url }, index) => (
              <li
                key={index}
                className="flex p-2 items-center rounded gap-3 hover:bg-base-200 transition-colors duration-75"
              >
                <Link
                  key={index}
                  className=""
                  href={`${url}${element == "Registrar" || option == "Registrar" ? "/registrar" : ""}`}
                >
                  {option}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </details>
    </li>
  );
};
