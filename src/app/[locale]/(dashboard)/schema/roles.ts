

import { z } from "zod";
export  function roleSchema(t:(key: string) => string) {
  return  z.object({
    name: (z.string({message: t("commonValidations.required")}))
    Code: (z.string({message: t("commonValidations.required")}))


  })
  
   
}


