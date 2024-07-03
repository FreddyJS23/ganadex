import { z } from './configInitZod';

export const yearsToGenerateReportShema = z.object({
    year: z.number().refine((data) => data >= 1980 || data <= 2100, {
        message: 'Escriba un año valido',
    }),
});
