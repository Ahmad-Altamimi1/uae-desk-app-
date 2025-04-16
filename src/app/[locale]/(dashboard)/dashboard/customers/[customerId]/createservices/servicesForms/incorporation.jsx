import Input from "@/components/form/input";
import { FaBuilding } from "react-icons/fa6";

const IncorporationCertificate = () => {
    return (
        <fieldset className="space-y-4 mb-4">
            <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-cyan-600 pb-1">
                <FaBuilding /> Certificate of Incorporation Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label={{ id: "incorporation_certificate_number.label" }}
                    showLabel
                    name="incorporation_certificate_number"
                    i18nNamespace="dashboard.customers.Services.IncorporationCertificate"
                    placeholder={{ id: "incorporation_certificate_number.placeholder" }}
                />

                <Input
                    type="date"
                    label={{ id: "incorporation_certificate_date.label" }}
                    showLabel
                    name="incorporation_certificate_date"
                    i18nNamespace="dashboard.customers.Services.IncorporationCertificate"
                    placeholder={{ id: "incorporation_certificate_date.placeholder" }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="date"
                    label={{ id: "incorporation_certificate_expiry.label" }}
                    showLabel
                    name="incorporation_certificate_expiry"
                    i18nNamespace="dashboard.customers.Services.IncorporationCertificate"
                    placeholder={{ id: "incorporation_certificate_expiry.placeholder" }}
                />

                <Input
                    label={{ id: "incorporation_certificate_authority.label" }}
                    showLabel
                    name="incorporation_certificate_authority"
                    i18nNamespace="dashboard.customers.Services.IncorporationCertificate"
                    placeholder={{ id: "incorporation_certificate_authority.placeholder" }}
                />
            </div>
        </fieldset>
    );
};

export default IncorporationCertificate;
