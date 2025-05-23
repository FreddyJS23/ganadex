import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface ButtonProps {
  href: Url;
  tittle?:string;
  /**Recomendado para botones pequeños ubicado al lado de un select dinámico para crear elementos sin necesidad a una sección determinada */
  small?:boolean;
}

export const ButtonCreateItem = ({ href,tittle="Crear",small=false }: ButtonProps) => {
  return (
    <Link
      title={tittle}
      className="group cursor-pointer outline-none hover:rotate-90 duration-300"
      href={href}
      
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={small ? "23px" : "50px"}
        height={small ? "23px" : "50px"}
        viewBox="0 0 24 24"
        className="stroke-primary 
                fill-none group-hover:fill-[#e8dea0]
                 group-active:stroke-[#835c25] group-active:fill-[#f3f0ce] 
                 dark:group-hover:fill-[#076d0c]
                dark:group-active:stroke-[#00b806] dark:group-active:fill-[#59ff50] 
                 group-active:duration-0 duration-300"
      >
        <path
          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          stroke-width="1.5"
        ></path>
        <path d="M8 12H16" stroke-width="1.5"></path>
        <path d="M12 16V8" stroke-width="1.5"></path>
      </svg>
    </Link>
  );
};
