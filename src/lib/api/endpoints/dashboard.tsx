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
  deleteCustomerMediaDelete: "api/customers/media/delete/",
  CustomerSubmitVerification: "api/customers/submitVerification",
  CustomerSubmitReview: "api/customers/{customer}/submit-review",
  CustomerRequestDocument: "api/customers/{customer}/request-document",
  CustomerAddTaxId: "api/customers/{customer}/add-tax-id",
  CustomerEditStatus: "api/customers/edit-status",
  CustomerUpdateCreator: "api/customers/updateCreator",
  CustomerInvoices: "api/customers/invoices/",

  /////////////

  //permissions
  getPermissions: "api/permissions/index",
  PermissionStore: "api/permissions/store",
  PermissionCreate: "api/permissions/create",
  PermissionEdit: "api/permissions/edit",
  PermissionUpdate: "api/permissions/update",
  PermissionDestroy: "api/permissions/destroy",

  //roles
  getRoles: "api/roles/index",
  RolesCreate: "api/roles/create",
  RolesStore: "api/roles/store",
  RolesEdit: "api/roles/edit",
  RolesUpdate: "api/roles/update",
  RolesDestroy: "api/roles/destroy",

  //services
  getServices: "api/services/index",
  ServicesCreate: "api/services/create",
  ServicesStore: "api/services/store",
  ServicesEdit: "api/services/edit",
  ServicesUpdate: "api/services/update",
  ServicesDestroy: "api/services/destroy",

  //branches
  getBranches: "api/branches/index",
  BranchesCreate: "api/branches/create",
  BranchesStore: "api/branches/store",
  BranchesEdit: "api/branches/edit",
  BranchesUpdate: "api/branches/update",
  BranchesDestroy: "api/branches/destroy",

  getLocations: "api/branches/create",

  //userActivity
  getLogs: "api/logs",
  getLogsById: "api/logs/{id}",

  //shifts
  getShifts: "api/shifts/index",
  ShiftsCreate: "api/shifts/create",
  ShiftsStore: "api/shifts/store",
  ShiftsEdit: "api/shifts/edit",
  ShiftsUpdate: "api/shifts/update",
  ShiftsDestroy: "api/shifts/destroy",
  updateStatus: "api/shifts/updateStatus",

  //attendance
  getAttendance: "api/attendances/index",

  //location
};

export const tags: Record<keyof typeof endPoints, keyof typeof endPoints> =
  Object.fromEntries(Object.entries(endPoints).map(([key]) => [key, key]));

export default endPoints;
