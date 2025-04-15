import { DocumentType } from "@/types/enums";

export const documentTypeOptions = [
  { label: "Passport", value: DocumentType.PASSPORT },
  { label: "Emirates ID", value: DocumentType.EMIRATES_ID },
  { label: "Trade License", value: DocumentType.TRADE_LICENSE },
  { label: "Tax Certificate", value: DocumentType.TAX_CERTIFICATE },
  { label: "Chamber Certificate", value: DocumentType.CHAMBER_CERTIFICATE },
  { label: "Commercial Register", value: DocumentType.COMMERCIAL_REGISTER },
  { label: "Partnership Agreement", value: DocumentType.PARTNERSHIP_AGREEMENT },
  {
    label: "Corporate Tax Registration",
    value: DocumentType.CORPORATE_TAX_REGISTRATION,
  },
  { label: "VAT Certificate", value: DocumentType.VAT_CERTIFICATE },
  {
    label: "Certificate of Incorporation",
    value: DocumentType.CERTIFICATE_OF_INCORPORATION,
  },
  { label: "UAE National ID", value: DocumentType.UAE_NATIONAL_ID },
  { label: "Power of Attorney", value: DocumentType.POWER_OF_ATTORNEY },
  { label: "Bank Statement", value: DocumentType.BANK_STATEMENT },
  {
    label: "Audited Financial Statement",
    value: DocumentType.AUDITED_FINANCIAL_STATEMENT,
  },
  { label: "Lease Agreement", value: DocumentType.LEASE_AGREEMENT },
  { label: "Trademark Certificate", value: DocumentType.TRADEMARK_CERTIFICATE },
  {
    label: "Memorandum of Association",
    value: DocumentType.MEMORANDUM_OF_ASSOCIATION,
  },
  { label: "Shareholder Agreement", value: DocumentType.SHAREHOLDER_AGREEMENT },
  { label: "Reconsideration", value: DocumentType.RECONSIDERATION },
];
