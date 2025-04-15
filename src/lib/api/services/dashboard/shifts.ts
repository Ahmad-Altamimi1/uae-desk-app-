import { IRequestShifts, IResponseShifts } from "@/entities/dashboard/shifts";
import { api } from "../../serverCore";

export const ShiftsService = {
  create: (data: Omit<IRequestShifts, "id">) =>
    api.post<IResponseShifts, Omit<IRequestShifts, "id">>(
      `ShiftsStore`,
      data
    ),

    destroy: (id: number) =>
      api.post("ShiftsDestroy", { id }), 
  };

  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),

