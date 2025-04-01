import IconoLogoDark from "@/icons/logo-dark-fuente.svg";
import IconoLogo from "@/icons/logo-light-fuente.svg";

type LogosProps = {
  small: boolean;
};

export const Logos = ({ small }: LogosProps) => {
  return (
    <>
      <div className={`block dark:hidden pt-4  ${small ? "self-center" : ""} `}>
        <IconoLogo className={small ? "size-10" : "size-32"} />
      </div>
      <div className={`hidden dark:block pt-4 ${small ? "self-center" : ""} `}>
        <div className="hidden sm:block">
          <IconoLogoDark className={small ? "size-10" : "size-32"} />
        </div>
         <div className="block sm:hidden">
          <IconoLogo className={small ? "size-10" : "size-32"} />
        </div> 
      </div>
    </>
  );
};
