import Input from "@/components/form/input";
import { FaCertificate } from "react-icons/fa6";

const TaxCertificate = () => {
    return (
        <fieldset className="space-y-4">
            <div className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <FaCertificate /> Tax Certificate Details
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    label={{ id: "tax_certificate_number.label" }}
                    showLabel
                    name="tax_certificate_number"
                    i18nNamespace="dashboard.customers.Services.TaxCertificate"
                    placeholder={{ id: "tax_certificate_number.placeholder" }}
                />

                <Input
                    type="date"
                    label={{ id: "tax_certificate_expiry.label" }}
                    showLabel
                    name="tax_certificate_expiry"
                    i18nNamespace="dashboard.customers.Services.TaxCertificate"
                    placeholder={{ id: "tax_certificate_expiry.placeholder" }}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    type="date"
                    label={{ id: "tax_registration_date.label" }}
                    showLabel
                    name="tax_registration_date"
                    i18nNamespace="dashboard.customers.Services.TaxCertificate"
                    placeholder={{ id: "tax_registration_date.placeholder" }}
                />

                <Input
                    label={{ id: "tax_authority_name.label" }}
                    showLabel
                    name="tax_authority_name"
                    i18nNamespace="dashboard.customers.Services.TaxCertificate"
                    placeholder={{ id: "tax_authority_name.placeholder" }}
                />
            </div>
        </fieldset>
    );
};

export default TaxCertificate;
