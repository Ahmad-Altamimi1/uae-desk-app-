export enum PaymentMethod {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  PAYPAL = "paypal",
  BANK_TRANSFER = "bank_transfer",
}
export enum CustomerStatus {
  Pending = 0,
  In_Progress = 1,
  Verified = 2,
  Completed = 3,
}
export enum DocumentType {
  PASSPORT = "passport",
  EMIRATES_ID = "emirates_id",
  TRADE_LICENSE = "trade_license",
  TAX_CERTIFICATE = "tax_certificate",
  CHAMBER_CERTIFICATE = "chamber_certificate",
  COMMERCIAL_REGISTER = "commercial_register",
  PARTNERSHIP_AGREEMENT = "partnership_agreement",
  CORPORATE_TAX_REGISTRATION = "corporate_tax_registration",
  VAT_CERTIFICATE = "vat_certificate",
  CERTIFICATE_OF_INCORPORATION = "certificate_of_incorporation",
  UAE_NATIONAL_ID = "uae_national_id",
  POWER_OF_ATTORNEY = "power_of_attorney",
  BANK_STATEMENT = "bank_statement",
  AUDITED_FINANCIAL_STATEMENT = "audited_financial_statement",
  LEASE_AGREEMENT = "lease_agreement",
  TRADEMARK_CERTIFICATE = "trade_mark_certificate",
  MEMORANDUM_OF_ASSOCIATION = "memorandum_of_association",
  SHAREHOLDER_AGREEMENT = "shareholder_agreement",
  RECONSIDERATION = "reconsideration",
}
