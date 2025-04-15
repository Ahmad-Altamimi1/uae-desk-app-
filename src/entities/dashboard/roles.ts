
export interface IResponseUsersRoles {
    id: number;
    name: string;
    code: string;
    permissions: []
}

export interface IRequestUsersRoles {
    id: number;
    name: string;
    code:string;
    permissions: []

}

export interface IGetRole {
  data: IRoleData;
}

export interface IRoleData {
  role: IResponseUsersRoles;
  status: boolean;

}