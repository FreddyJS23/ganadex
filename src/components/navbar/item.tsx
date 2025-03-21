'use client';

import { useSession } from "next-auth/react";

export const NameHacienda = ()=>{
  
const hacienda=useSession().data?.user.hacienda?.nombre;

    const transformNameHacienda=()=>{

        /* habra veces que el nombre de hacienda que guarden
         no inicie con hacienda, por eso se agrega */
       if(hacienda?.startsWith('Hacienda')) return hacienda
       else if(!hacienda) return 'Sin sesión en hacienda'
       else return `Hacienda ${hacienda}`
      
    }

    return (
    <span className='font-bold text-xl mt-1'>{transformNameHacienda()}</span>
  )
}
