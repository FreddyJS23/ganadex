import { Table } from '@nextui-org/table';

type LayoutTableProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
    type: string;
};

export const LayoutTable = ({ children, type }: LayoutTableProps) => {
    return (
        <Table
            aria-label={`Table ${type}`}
            classNames={{
                wrapper: 'bg-base-100',
                th: 'bg-base-200 font-bold text-current',
            }}
        >
            {children}
        </Table>
    );
};
