import {  optionsSidebarAdmin,optionsSidebarVeterinary } from '@/collections/sidebarElements';
import { SidebarElement } from './item';
import { Logos } from '@/ui/Logos';
import { auth } from '@/app/auth';
import { Session } from 'next-auth';

type SidebarProps = {
    /**Agrega estilos para pantallas pequeñas */
    android: boolean;
};

const sidebarElements = (responsive: boolean,role:'admin'|'veterinario') => {
    
    if(role == 'admin')  return optionsSidebarAdmin.map(({ element, icon, url, options }, key) => (
        <SidebarElement
            key={key}
            element={element}
            icon={icon}
            options={options}
            responsive={responsive}
            url={url}
        />
    ));

    if(role == 'veterinario' ) return optionsSidebarVeterinary.map(({ element, icon, url, options }, key) => (
        <SidebarElement
            key={key}
            element={element}
            icon={icon}
            options={options}
            responsive={responsive}
            url={url}
        />
    ));
};

export const Sidebar =async ({ android }: SidebarProps) => {
    const session = await auth() as Session
    const role=session.user.rol
    return (
        <>
            {/* android/desktop */}
            <nav
                className={`${android ? 'flex bg-base-100 w-52' : 'hidden'} scrollbar scrollbar-w-1 scrollbar-thumb-primary scrollbar-thumb-rounded-full overflow-x-auto h-screen bg-gradient-to-r from-background from-95%   fixed lg:flex lg:flex-col items-center lg:fixed`}
            >
                {/*  container */}
                <div className="h-full flex flex-col gap-2 items-center w-full ">
                    <Logos small={false} />

                    <div className="divider divider-primary self-center w-36 mt-0 "></div>
                    {/*  cuerpo */}
                    <ul className="flex flex-col w-full ">
                        {sidebarElements(false,role)}
                    </ul>
                </div>
            </nav>

            {/*tablet*/}
            {/*  container */}
            <nav className="hidden z-50 h-screen bg-gradient-to-r from-background from-95% fixed sm:max-lg:flex sm:max-lg:flex-col items-center sm:max-lg:fixed  ">
                <div className="flex flex-col gap-2 items-center ">
                    <Logos small={true} />
                    <div className="divider divider-primary self-center w-12 mt-0 "></div>
                    {/*  cuerpo */}
                    <ul className="flex flex-col ">
                        {sidebarElements(true,role)}
                    </ul>
                </div>
            </nav>
        </>
    );
};
