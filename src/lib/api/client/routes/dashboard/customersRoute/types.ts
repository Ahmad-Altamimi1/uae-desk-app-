import { GenericListResponse } from "../../../types";
import { IGetCustomerPayload } from "./req";
import { ICustomerItem, ICustomerList, IRole } from "./res"; //

export type CustomersRoute = {
  getCustomers: () => Promise<GenericListResponse<ICustomerList[]>>;
  getCustomer: (
    slug: IGetCustomerPayload
  ) => Promise<GenericListResponse<ICustomerItem>>;
  getRoles: () => Promise<GenericListResponse<IRole[]>>; 

};
