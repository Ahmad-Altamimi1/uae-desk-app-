
export interface IShiftsData{
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    is_active: string;
   
   
}
export interface IResponseShifts {
  data: IShiftsData[];
  status: "success" | "error";
  message: string;
}
export interface IRequestShifts{
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    is_active: string;

  }
  