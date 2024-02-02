export default function LayoutForms({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className="sm:pl-8 xl:pl-0 p-4">{children}</section>;
}
