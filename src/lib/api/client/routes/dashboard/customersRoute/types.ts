import { GenericListResponse } from "../../../types";
import { ICustomerList } from "./res";
export type CustomersRoute = {
  getCustomers: () => Promise<GenericListResponse<ICustomerList[]>>;

};
