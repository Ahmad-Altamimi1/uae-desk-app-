import { IBranchesData } from "./branches";
import { IServicesData } from "./services";

export interface IResponseCustomer {
  id: number;
  first_name: string;
  last_name: string;
  updated_by: string;
  business_name: string;
  phone_number: string;
  second_number: string;
  email: string;
  address: string;
  status: string;
  created_by: string;
  customer_code: string;
  invoice_number: string;
  price: number;
  portal_email: string;
  portal_password: string;
  tax_id: string;
  review_by: string;
  invoice_pdf_url: string;
  document_details: string;
  vat_value: number;
  serial_number: string;
  branch_id: number;
  transaction_refrence_number: string;
  fta_refrence: string;
  fta_password: string;
  fta_user_name: string;
  payment_method: string;
  gmail_user_name: string;
  gmail_password: string;
  submitted_for_verification_at: string | null;
  expert_submitted_at: string | null;
  supervisor_approved_at: string | null;
  branch: IBranchesData;
  services: IServicesData[];
  media: IMediaData[];
}
export interface IMediaData {
  id: number;
  customer_id: number;
  document_name: string;
  file_type: string;
  file_path: string;
  created_at: string;
  updated_at: string;
}

export interface IRequestCustomer {
  id: number;
  first_name: string;
  last_name: string;
  updated_by: string;
  business_name: string;
  phone_number: string;
  second_number: string;
  email: string;
  address: string;
  status: number;
  created_by: string;
  customer_code: string;
  invoice_number: string;
  price: number;
  portal_email: string;
  portal_password: string;
  tax_id: string;
  review_by: string;
  invoice_pdf_url: string;
  document_details: string;
  vat_value: number;
  serial_number: string;
  branch_id: string;
  transaction_refrence_number: string;
  fta_refrence: string;
  fta_password: string;
  fta_user_name: string;
  payment_method: string;
  gmail_user_name: string;
  gmail_password: string;
  submitted_for_verification_at: string | null;
  expert_submitted_at: string | null;
  supervisor_approved_at: string | null;
}

export interface IGetCustomer {
  data: ICustomerData;
}

export interface ICustomerData {
  customer: IResponseCustomer;
  status: boolean;
  services: IServicesData[];
  branches: IBranchesData[];
  selectedServices: number[];
}
export interface IUploadMedia {
  document_name: string;
  media: File[];
}
