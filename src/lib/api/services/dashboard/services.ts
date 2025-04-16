import { IResponseServices, IRequestServices } from "@/entities/dashboard";
import { api } from "../../serverCore";


export const ServicesService = {
    create: (data: Omit<IRequestServices, "id">) =>
      api.post<IResponseServices, Omit<IRequestServices, "id">>("ServicesStore", data),
  
    destroy: (id: number) =>
      api.post("ServicesDestroy", { id }), 

    update: (id: number) =>
      api.post("ServicesUpdate", { id }), 
  };



  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),

