export interface IResponseBranches {
  data: IBranchesData[];
  status: "success" | "error";
  message: string;
}
export interface IResponseSingleBranche {
  data: IBranchesData;
  status: "success" | "error";
  message: string;
}
export interface IBranchesData {
  id: number;
  branch_name: string;
  location_id: number;
  address: string ;
  phone_number: string ;
  email: string ;
  created_at: string;
  updated_at: string;
  latitude: string;
  longitude: string;
}

export interface IRequestBranches {
  id: number;
  branch_name: string;
  location_id: number;
  address: string | null;
  phone_number: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
  latitude: string;
  longitude: string;
}

export interface ILocation {
  id: number;
  name: string;
  latitude:string;
  longitude:string;
  gau_code:string;
}

