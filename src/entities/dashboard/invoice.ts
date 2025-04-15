import { IResponseServices } from "./services";

interface InvoiceCustomer {
  id: number;
  first_name: string;
  last_name: string;
  business_name: string;
  phone_number: string;
  second_number: string | null;
  address: string;
  email: string;
  vat_value: number | null;
  invoice_pdf_url: string | null;
  status: number;
  invoice_number: string;
  serial_number: string | null;
  price: string;
  customer_code: string | null;
  created_by: number;
  created_at: string;
  updated_at: string;
  portal_email: string | null;
  portal_password: string | null;
  tax_id: string | null;
  review_by: number | null;
  document_details: string;
  payment_method: string | null;
  fta_user_name: string | null;
  fta_password: string | null;
  fta_refrence: string | null;
  transaction_refrence_number: string | null;
  branch_id: number | null;
  gmail_user_name: string | null;
  gmail_password: string | null;
  submitted_for_verification_at: string | null;
  expert_submitted_at: string | null;
  supervisor_approved_at: string | null;
  updated_by: number | null;
  service: string | null;
  services: any[];
  branch: any;
}

interface InvoiceUser {
  id: number;
  branch_id: number | null;
  location_id: number | null;
  created_by: number | null;
  updated_by: number | null;
  name: string;
  email: string;
  email_verified_at: string | null;
  mobile: string;
  user_type: string | null;
  image: string | null;
  status: number;
  is_location_flexible: number;
  shift_id: number | null;
}

export interface InvoiceDetails {
  customer: InvoiceCustomer;
  services: IResponseServices[];
  invoice_number: string;
  receipt_number: string | null;
  created: InvoiceUser;
  date: string;
  receipt_date: string;
  vat_value: number;
  vat_amount: number;
  total_amount: number;
  company_email: string;
  company_address: string;
  company_phone: string;
  logo: string;
  payment_method: string;
}
