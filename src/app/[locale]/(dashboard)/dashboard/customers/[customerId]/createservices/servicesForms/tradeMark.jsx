import Input from "@/components/form/input";
import { FaShieldAlt } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";

const TrademarkCertificateDetails = () => {
    return (
        <fieldset className="space-y-4 mb-4">
            <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-cyan-600 pb-1">
                <FaShieldAlt /> Trademark Certificate Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label={{ id: "trademark_certificate_number.label" }}
                    showLabel
                    name="trademark_certificate_number"
                    i18nNamespace="dashboard.customers.Services.Trademark"
                    placeholder={{ id: "trademark_certificate_number.placeholder" }}
                />

                <Input
                    type="date"
                    label={{ id: "trademark_expiry_date.label" }}
                    showLabel
                    name="trademark_expiry_date"
                    i18nNamespace="dashboard.customers.Services.Trademark"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="date"
                    label={{ id: "trademark_registration_date.label" }}
                    showLabel
                    name="trademark_registration_date"
                    i18nNamespace="dashboard.customers.Services.Trademark"
                />

                <Input
                    label={{ id: "trademark_authority_name.label" }}
                    showLabel
                    name="trademark_authority_name"
                    i18nNamespace="dashboard.customers.Services.Trademark"
                    placeholder={{ id: "trademark_authority_name.placeholder" }}
                />
            </div>

            <Textarea
                label={{ id: "trademark_description.label" }}
                showLabel
                name="trademark_description"
                i18nNamespace="dashboard.customers.Services.Trademark"
                placeholder={{ id: "trademark_description.placeholder" }}
            />

            <Input
                label={{ id: "trademark_classification.label" }}
                showLabel
                name="trademark_classification"
                i18nNamespace="dashboard.customers.Services.Trademark"
                placeholder={{ id: "trademark_classification.placeholder" }}
            />
        </fieldset>
    );
};

export default TrademarkCertificateDetails;
