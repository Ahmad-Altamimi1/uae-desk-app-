

import { z } from "zod";
export  function permissionSchema(t:(key: string) => string) {
  return  z.object({
    name: (z.string({message: t("commonValidations.required")}))


  })
  
   
}


