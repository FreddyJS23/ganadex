import { options } from '@/collections/sidebarElements';
import { SidebarElement } from './item';
import { Logos } from '@/ui/Logos';

type SidebarProps = {
    /**Agrega estilos para pantallas pequeñas */
    android: boolean;
};

const sidebarElements = (responsive: boolean) => {
    return options.map(({ element, icon, url, optionMultiple }, key) => (
        <SidebarElement
            key={key}
            element={element}
            icon={icon}
            optionMultiple={optionMultiple}
            responsive={responsive}
            optionCattle={element == 'Ganado'}
            url={url}
        />
    ));
};

export const Sidebar = ({ android }: SidebarProps) => {
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
                        <SidebarElement
                            element="Dashboard"
                            icon="dashboard"
                            optionMultiple={false}
                            responsive={false}
                            url="/dashboard"
                        />

                        {sidebarElements(false)}
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
                        <SidebarElement
                            element="Dashboard"
                            icon="dashboard"
                            optionMultiple={false}
                            responsive={true}
                            url="/dashboard"
                        />

                        {sidebarElements(true)}
                    </ul>
                </div>
            </nav>
        </>
    );
};
