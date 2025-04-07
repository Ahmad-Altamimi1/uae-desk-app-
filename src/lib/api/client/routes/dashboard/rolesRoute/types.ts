import { GenericListResponse } from "../../../types";
import { IGetUsersRoles } from "./req";
import { IRolesList } from "./res"; //

export type RolesRoute = {
  getRoles: () => Promise<GenericListResponse<IRolesList[]>>;
  getRole: (slug: IGetUsersRoles) => Promise<GenericListResponse<IRolesList>>;
 

};
