import React, { FC } from "react";
import Passport from "./servicesForms/Passport";
import { api } from "@/lib/api/serverCore";
import { ICustomerData } from "@/entities/dashboard";
import EmiratesId from "./servicesForms/emiratesId";
import TaxCertificate from "./servicesForms/taxCertificate";
import TradeLicense from "./servicesForms/tradeLicense";
import ChamberCertificate from "./servicesForms/camberCertifcate";
import CommercialRegister from "./servicesForms/commericalRegister";
import PartnershipAgreement from "./servicesForms/partnershipAgreement";
import CorporateTaxCertificate from "./servicesForms/invoice";
import VatCertificate from "./servicesForms/vatCertifcate";
import IncorporationCertificate from "./servicesForms/incorporation";
import UAENationalID from "./servicesForms/uaeNational";
import PowerOfAttorney from "./servicesForms/powe";
import BankStatementDetails from "./servicesForms/bank";
import LeaseAgreementDetails from "./servicesForms/leaseAgreement";
import TrademarkCertificateDetails from "./servicesForms/tradeMark";
import MemorandumOfAssociationDetails from "./servicesForms/assosation";
import ShareholderAgreementDetails from "./servicesForms/shareHolderAgreement";
import AuditedFinancialStatementDetails from "./servicesForms/financal";




interface CustomerViewProps {
  params: Promise<{ customerId: string }>;
}
const CreateServices: FC<CustomerViewProps> = async ({ params }) => {
  const data = await api.get<ICustomerData>([
    "groupedMedia",
    (await params).customerId,
  ]);
  console.log("datadatadatadatadatadatadatadatadatadatadatadatadata", data);

  return (
    <div className="grid grid-cols-2">
      <div className="services">
        <EmiratesId />
        <Passport />

        < TaxCertificate />
        <TradeLicense />
        < ChamberCertificate />
        < CommercialRegister />
        < PartnershipAgreement />
        < CorporateTaxCertificate />
        <VatCertificate />
        < IncorporationCertificate />
        < UAENationalID />
        <PowerOfAttorney />
        <BankStatementDetails />
        <LeaseAgreementDetails />
        <TrademarkCertificateDetails />
        <MemorandumOfAssociationDetails />
        < ShareholderAgreementDetails />
        <AuditedFinancialStatementDetails/>
      </div>
      <iframe
        src={`https://docs.google.com/gview?url=${`https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`}&embedded=true`}
        style={{ height: "600px" }}
      />
    </div>
  );
};

export default CreateServices;
