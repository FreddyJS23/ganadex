import { CheckboxTheme } from '../../ui/CheckboxTheme';
import IconoNotificacion from '@/icons/icono-notificacion.svg';
import IconoUser from '@/icons/icono-user.svg';
import IconoBackup from '@/icons/icono-descargar.svg';
import IconoRestore from '@/icons/icono-subir.svg';
import { BadgeNotification } from '@/ui/BadgeNotification';
import { NotificationMain } from '../notifications';
import { HamburgerButton } from '@/ui/HamburgerButton';
import { Sidebar } from '../sidebar';
import { getData } from '@/utils/getData';
import { ResponseNotificaciones } from '@/types';
import Link from 'next/link';

export const Navbar = async () => {

    const {notificaciones}:ResponseNotificaciones=await getData('notificaciones')
    
    const {parto=[],revision=[],secado=[]}=notificaciones

    const totalNotifications=parto.length + revision.length  + secado.length

    
    return (
        <>
            <div className="navbar bg-primary sm:bg-transparent ">
                <div className="hidden sm:flex sm:flex-1">
                    <CheckboxTheme />
                </div>
                {/*  menu sidebar responsive */}
                <div className="drawer flex flex-1 sm:hidden">
                    <input
                        id="my-drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
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
                    {/*  notificacion */}
                   <Link target='_blank' href={'http://127.0.0.1:8000/respaldo'}><IconoBackup className={'size-8'}/></Link>
                   <Link target='_blank' href={'http://127.0.0.1:8000/restaurar'}><IconoRestore className={'size-8'}/></Link>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle"
                        >
                            <div className="indicator">
                                <IconoNotificacion className="text-base-100 sm:text-current  size-8" />
                                <BadgeNotification totalNotifications={totalNotifications} />
                            </div>
                        </div>

                        <NotificationMain {...notificaciones} />
                    </div>

                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <IconoUser className="text-base-100 sm:text-current size-8" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a className="justify-between">Profile</a>
                            </li>
                            <li>
                                <a>Logout</a>
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
