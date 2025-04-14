const endPoints = {
  login: "api/login",
  logout: "api/logout",
  getCustomers: "api/customers/index",
  CustomerCreate: "api/customers/create",
  CustomerStore: "api/customers/store",
  CustomerEdit: "api/customers/edit/",
  CustomerUpdate: "api/customers/update",
  CustomerDestroy: "api/customers/destroy",
  CustomerShow: "api/customers/view/",
  CustomerAccountStatement: "api/customers/accountStatement/view",
  CustomerImport: "api/customers/importcustomers",
  CustomerMediaStore: "api/customers/media/store",
  CustomerFtaDocumentUpload: "api/customers/upload/fta-docuemnt",
  CustomerFtaDocumentUpdate: "api/customers/update/fta-docuemnt",
  CustomerMedia: "api/customers/media",
  deleteCustomerMediaDelete: "api/customers/media/delete",
  CustomerSubmitVerification: "api/customers/submit-verification",
  CustomerSubmitReview: "api/customers/{customer}/submit-review",
  CustomerRequestDocument: "api/customers/{customer}/request-document",
  CustomerAddTaxId: "api/customers/{customer}/add-tax-id",
  CustomerEditStatus: "api/customers/edit-status",
  CustomerUpdateCreator: "api/customers/updateCreator",

  /////////////
  getRoles: "api/roles/index",
  getPermissions: "api/permissions/index",

  PermissionStore: "api/permissions/store",

  RolesCreate: "api/roles/create",
  RolesStore: "api/roles/store",
  //services
  getServices: "api/services/index",
  //branches
  getBranches: "api/branches/index",
};

export const tags: Record<keyof typeof endPoints, keyof typeof endPoints> =
  Object.fromEntries(Object.entries(endPoints).map(([key]) => [key, key]));

export default endPoints;
