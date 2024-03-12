import { headerHistoryPriceMilk } from '@/collections/headerColums';
import { ResponsePreciosLeche } from '@/types';
import React from 'react';

export const TableHistoryPriceMilk = ({ precios }: ResponsePreciosLeche) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {headerHistoryPriceMilk.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {precios.map(({ id, precio, fecha }) => (
                        <tr key={id}>
                            <td>{precio} </td>
                            <td>{fecha.toISOString()} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
