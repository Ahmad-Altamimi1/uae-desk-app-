const endPoints = {
  login: "api/login",
  getCustomers: "api/customers/index",
  CustomerCreate: "api/customers/create",
  CustomerStore: "api/customers/store",
  CustomerEdit: "api/customers/edit/{id}",
  CustomerUpdate: "api/customers/update/{id}",
  CustomerDestroy: "api/customers/destroy",
  CustomerShow: "api/customers/view/{id}",
  CustomerAccountStatement: "api/customers/accountStatement/view/{id}",
  CustomerImport: "api/customers/importcustomers",
  CustomerMediaStore: "api/customers/media/store/{id}",
  CustomerFtaDocumentUpload: "api/customers/upload/fta-docuemnt/{id}",
  CustomerFtaDocumentUpdate: "api/customers/update/fta-docuemnt/{id}",
  CustomerMedia: "api/customers/media/{id}",
  deleteCustomerMediaDelete: "api/customers/media/delete/{id}",
  CustomerSubmitVerification: "api/customers/{id}/submit-verification",
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
};
export default endPoints;
