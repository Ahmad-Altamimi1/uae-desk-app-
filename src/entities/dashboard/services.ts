export interface IResponseServices {
  data: IServicesData[];
  status: "success" | "error";
  message: string;
}
export interface IServicesData {
  id: number;
  name: string;
}

export interface IRequestServices {
  id: number;
  name: string;
}
