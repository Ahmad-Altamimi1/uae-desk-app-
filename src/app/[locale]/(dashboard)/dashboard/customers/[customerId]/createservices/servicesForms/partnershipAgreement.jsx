import Input from "@/components/form/input";
import { FaHandshake } from "react-icons/fa";

const PartnershipAgreement = () => {
    return (
        <fieldset className="space-y-4 mb-4">
            <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-cyan-600 pb-1">
                <FaHandshake /> Partnership Agreement Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label={{ id: "partnership_agreement_number.label" }}
                    showLabel
                    name="partnership_agreement_number"
                    i18nNamespace="dashboard.customers.Services.PartnershipAgreement"
                    placeholder={{ id: "partnership_agreement_number.placeholder" }}
                />

                <Input
                    type="date"
                    label={{ id: "partnership_agreement_date.label" }}
                    showLabel
                    name="partnership_agreement_date"
                    i18nNamespace="dashboard.customers.Services.PartnershipAgreement"
                    placeholder={{ id: "partnership_agreement_date.placeholder" }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="date"
                    label={{ id: "partnership_agreement_expiry.label" }}
                    showLabel
                    name="partnership_agreement_expiry"
                    i18nNamespace="dashboard.customers.Services.PartnershipAgreement"
                    placeholder={{ id: "partnership_agreement_expiry.placeholder" }}
                />

                <Input
                    label={{ id: "partnership_agreement_authority.label" }}
                    showLabel
                    name="partnership_agreement_authority"
                    i18nNamespace="dashboard.customers.Services.PartnershipAgreement"
                    placeholder={{ id: "partnership_agreement_authority.placeholder" }}
                />
            </div>
        </fieldset>
    );
};

export default PartnershipAgreement;
