import Input from "@/components/form/input";
import {Textarea} from "@/components/ui/textarea";
import { FaHandshake } from "react-icons/fa";

const ShareholderAgreementDetails = () => {
    return (
        <fieldset className="space-y-4 mb-4">
            <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-yellow-500 pb-1">
                <FaHandshake /> Shareholder Agreement Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label={{ id: "shareholder_agreement_number.label" }}
                    showLabel
                    name="shareholder_agreement_number"
                    i18nNamespace="dashboard.customers.Services.Shareholder"
                    placeholder={{ id: "shareholder_agreement_number.placeholder" }}
                />

                <Input
                    type="date"
                    label={{ id: "shareholder_agreement_issue_date.label" }}
                    showLabel
                    name="shareholder_agreement_issue_date"
                    i18nNamespace="dashboard.customers.Services.Shareholder"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="date"
                    label={{ id: "shareholder_agreement_expiry_date.label" }}
                    showLabel
                    name="shareholder_agreement_expiry_date"
                    i18nNamespace="dashboard.customers.Services.Shareholder"
                />

                <Input
                    label={{ id: "shareholder_agreement_authority.label" }}
                    showLabel
                    name="shareholder_agreement_authority"
                    i18nNamespace="dashboard.customers.Services.Shareholder"
                    placeholder={{ id: "shareholder_agreement_authority.placeholder" }}
                />
            </div>

            <Textarea
                label={{ id: "shareholder_agreement_details.label" }}
                showLabel
                name="shareholder_agreement_details"
                i18nNamespace="dashboard.customers.Services.Shareholder"
                placeholder={{ id: "shareholder_agreement_details.placeholder" }}
            />

            <Textarea
                label={{ id: "shareholder_agreement_parties.label" }}
                showLabel
                name="shareholder_agreement_parties"
                i18nNamespace="dashboard.customers.Services.Shareholder"
                placeholder={{ id: "shareholder_agreement_parties.placeholder" }}
            />
        </fieldset>
    );
};

export default ShareholderAgreementDetails;
