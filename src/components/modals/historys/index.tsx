export const ContainerTableHistory = ({
    children,
}: {
    children: JSX.Element;
}) => {
    return (
        <div className="m-auto mb-4 max-h-96 overflow-x-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary scrollbar-thumb-rounded-full">
            {children}
        </div>
    );
};
