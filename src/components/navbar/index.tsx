import { CheckboxTheme } from '../../ui/CheckboxTheme';
import IconoNotificacion from '@/icons/icono-notificacion.svg';
import IconoUser from '@/icons/icono-user.svg';
import { BadgeNotification } from '@/ui/BadgeNotification';
import { NotificationMain } from '../notifications';
import { HamburgerButton } from '@/ui/HamburgerButton';
import { Sidebar } from '../sidebar';
import { getData } from '@/utils/getData';
import { ResponseNotificaciones } from '@/types';

export const Navbar = async () => {
     
    const dataNotifications:ResponseNotificaciones=await getData('response_notificaciones')
    
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
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle"
                        >
                            <div className="indicator">
                                <IconoNotificacion className="text-base-100 sm:text-current  size-8" />
                                <BadgeNotification />
                            </div>
                        </div>

                        <NotificationMain {...dataNotifications} />
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
