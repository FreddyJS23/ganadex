type ElementProfileProps = {
    tittle: string;
    content?: string;
    description?: string;
    children?: JSX.Element | JSX.Element[] | undefined;
    divider?: boolean;
};
/**Solo para centrar varios*/ 
export const LayoutCenterContentTabs = ({
    children,
    divider=true
}: {
    children:  JSX.Element | JSX.Element[];
    divider?:boolean
}) => {
    return (
        <>
        <div className="flex justify-between pt-8 px-8 w-full">{children}</div>
       {divider && <Divider />}
        </>

    );
};


export const LayoutContentTabs = ({
    children,
}: {
    children:  JSX.Element | JSX.Element[];
}) => {
    return (
        <div className="flex flex-col p-8 gap-4 w-full">{children}</div>
    );
};

 const Divider = () => {
    return <div className="divider divider-primary opacity-[0.03]"></div>;
};

export const ElementProfile = ({
    tittle,
    content,
    description,
    children,
    divider=true
}: ElementProfileProps) => {
    return (
        <div className="flex flex-col w-full">
            <div className={`flex justify-between items-center ${content ? 'w-7/12' : 'w-full'} `}>
                <div className={`flex flex-col gap-1 grow ${content ? 'w-60' : 'w-full'}`}>
                    <span className="font-bold text-xl">{tittle}</span>
                    <span className={`text-sm opacity-60  ${content && 'text-balance'}`}>{description}</span>
                    {children}
                </div>
              {content &&  <span>{content}</span>}
            </div>
           {divider && <Divider />}
        </div>
    );
};