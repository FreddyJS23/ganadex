import { headerServices } from '@/collections/headerColums';
import {  ResponseServicios } from '@/types';
import IconSearch from '@/icons/icono-Revisar.svg';

export const TableHistoryServices = ({ servicios }: ResponseServicios) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {headerServices.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {servicios.map(({ id, fecha, numero_toro }) => (
                        <tr key={id}>
                            <td>{fecha.toISOString()} </td>
                            <td>{numero_toro} </td>
                            <td>
                                <IconSearch className={'size-8 '} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
