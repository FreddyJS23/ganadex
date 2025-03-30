import IconoLogoDark from "@/icons/logo-dark-fuente.svg";
import IconoLogo from "@/icons/logo-light-fuente.svg";

type LogosProps = {
  small: boolean;
};

export const Logos = ({ small }: LogosProps) => {
  return (
    <>
      <div className={`block dark:hidden  ${small ? "self-center" : ""} `}>
        <IconoLogo className={small ? "size-16" : "size-36"} />
      </div>
      <div className={`hidden dark:block ${small ? "self-center" : ""} `}>
        <div className="hidden sm:block">
          <IconoLogoDark className={small ? "size-16" : "size-36"} />
        </div>
        <div className="block sm:hidden">
          <IconoLogo className={small ? "size-16" : "size-36"} />
        </div>
      </div>
    </>
  );
};
