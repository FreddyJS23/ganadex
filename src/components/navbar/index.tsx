import { CheckboxTheme } from "../../ui/CheckboxTheme";
import IconoUser from "@/icons/icono-user.svg";
import { NotificationMain } from "../notifications";
import { HamburgerButton } from "@/ui/HamburgerButton";
import { Sidebar } from "../sidebar";
import { getData } from "@/utils/getData";
import { ResponseFechaUltimoRespaldo, ResponseNotificaciones } from "@/types";
import Link from "next/link";
import { ButtonRestoreBd } from "../buttonRestoreBd";
import { ButtonBackupBd } from "../buttonBackuppBd";
import { ButtonGenerateReport } from "../buttonPrintReports";
import { auth } from "@/app/auth";
import { Session } from "next-auth";
import { NameHacienda } from "./item";

const elementsAdmin = (
  ultimo_backup: ResponseFechaUltimoRespaldo["ultimo_backup"],
) => {
  return (
    <>
      {/* restaurar y respaldar BD */}
      <ButtonGenerateReport />
      <ButtonBackupBd />
      <ButtonRestoreBd dateLastBackup={ultimo_backup ?? null} />

      {/*  notificacion */}
      <div className="dropdown dropdown-end">
        <NotificationMain />
      </div>
    </>
  );
};

export const Navbar = async () => {
  const { ultimo_backup }: ResponseFechaUltimoRespaldo = await getData(
    "fechaUltimoRespaldo",
  );

  const session = (await auth()) as Session;
  const role = session.user.rol;

  return (
    <>
      <div className="navbar bg-primary sm:bg-transparent ">
        <div
          title="Cambiar tema oscuro o claro"
          className="hidden sm:flex sm:flex-1 gap-2"
        >
          <CheckboxTheme />
          <NameHacienda />
        </div>
        {/*  menu sidebar responsive */}
        <div className="drawer flex flex-1 sm:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <HamburgerButton />
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <Sidebar android={true} />
          </div>
        </div>
        <div className=" flex gap-4">
          {role == "admin" && elementsAdmin(ultimo_backup)}

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              title="Ver perfil"
            >
              <IconoUser className="text-base-100 sm:text-current size-8" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/perfil"} className="justify-between">
                  Perfil
                </Link>
              </li>
              <li className="bg-error rounded-md">
                <Link prefetch={false} href={"/api/signOut"}>
                  Cerrar sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="hidden sm:flex divider divider-primary opacity-20 m-0 mb-2"></div>
    </>
  );
};
