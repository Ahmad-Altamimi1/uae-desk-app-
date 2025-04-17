import { DocumentType } from "@/types/enums";
import { FC } from "react";
import EmiratesId from "./servicesForms/emiratesId";
import TaxCertificate from "./servicesForms/taxCertificate";
import TradeLicense from "./servicesForms/tradeLicense";
import ChamberCertificate from "./servicesForms/camberCertifcate";
import CommercialRegister from "./servicesForms/commericalRegister";
import PartnershipAgreement from "./servicesForms/partnershipAgreement";
import CorporateTaxCertificate from "./servicesForms/invoice";
import VatCertificate from "./servicesForms/vatCertificate";
import IncorporationCertificate from "./servicesForms/incorporation";
import UAENationalID from "./servicesForms/uaeNational";
import PowerOfAttorney from "./servicesForms/powerOfAttorney";
import BankStatementDetails from "./servicesForms/bank";
import LeaseAgreementDetails from "./servicesForms/leaseAgreement";
import TrademarkCertificateDetails from "./servicesForms/tradeMark";
import MemorandumOfAssociationDetails from "./servicesForms/assosation";
import ShareholderAgreementDetails from "./servicesForms/shareHolderAgreement";
import AuditedFinancialStatementDetails from "./servicesForms/financal";
import Passport from "./servicesForms/Passport";
export const documentComponentsMap: Record<DocumentType, FC> = {
  [DocumentType.PASSPORT]: Passport,
  [DocumentType.EMIRATES_ID]: EmiratesId,
  [DocumentType.TRADE_LICENSE]: TradeLicense,
  [DocumentType.TAX_CERTIFICATE]: TaxCertificate,
  [DocumentType.CHAMBER_CERTIFICATE]: ChamberCertificate,
  [DocumentType.COMMERCIAL_REGISTER]: CommercialRegister,
  [DocumentType.PARTNERSHIP_AGREEMENT]: PartnershipAgreement,
  [DocumentType.CORPORATE_TAX_REGISTRATION]: CorporateTaxCertificate,
  [DocumentType.VAT_CERTIFICATE]: VatCertificate,
  [DocumentType.CERTIFICATE_OF_INCORPORATION]: IncorporationCertificate,
  [DocumentType.UAE_NATIONAL_ID]: UAENationalID,
  [DocumentType.POWER_OF_ATTORNEY]: PowerOfAttorney,
  [DocumentType.BANK_STATEMENT]: BankStatementDetails,
  [DocumentType.AUDITED_FINANCIAL_STATEMENT]: AuditedFinancialStatementDetails,
  [DocumentType.LEASE_AGREEMENT]: LeaseAgreementDetails,
  [DocumentType.TRADEMARK_CERTIFICATE]: TrademarkCertificateDetails,
  [DocumentType.MEMORANDUM_OF_ASSOCIATION]: MemorandumOfAssociationDetails,
  [DocumentType.SHAREHOLDER_AGREEMENT]: ShareholderAgreementDetails,
  [DocumentType.RECONSIDERATION]: () => (
    <div>Reconsideration component here</div>
  ),
};
