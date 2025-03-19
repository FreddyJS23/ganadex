'use client';

import { useSession } from "next-auth/react";

export const NameHacienda = () => {
  
    const  nameHacienda=useSession().data?.user.hacienda?.nombre
  
    const transformNameHacienda=()=>{

        let nombreHacienda=nameHacienda

        /* habra veces que el nombre de hacienda que guarden
         no inicie con hacienda, por eso se agrega */
       if(nameHacienda?.startsWith('Hacienda')) nombreHacienda=nameHacienda
       else if(!nameHacienda) nombreHacienda='Sin sesión en hacienda'
       else nombreHacienda='Hacienda ' + nameHacienda
      
       return nombreHacienda
    }

  

    return (
    <span className='font-bold text-xl mt-1'>{transformNameHacienda()}</span>
  )
}
