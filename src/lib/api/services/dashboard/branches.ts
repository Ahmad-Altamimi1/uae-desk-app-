import { IRequestBranches, IResponseBranches } from "@/entities/dashboard";
import { api } from "../../serverCore";


export const BranchesService = {
    create: (data: Omit<IRequestBranches, "id">) =>
      api.post<IResponseBranches, Omit<IRequestBranches, "id">>("BranchesStore", data),
  
    destroy: (id: number) =>
      api.post("BranchesDestroy", { id }), 
  };



  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),

