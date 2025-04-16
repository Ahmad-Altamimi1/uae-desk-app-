import Input from "@/components/form/input";
import { FaBuilding } from "react-icons/fa6";

const ChamberCertificate = () => {
    return (
        <fieldset className="space-y-4">
            <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-cyan-500 pb-1">
                <FaBuilding /> Chamber Certificate Details
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    label={{ id: "chamber_certificate_number.label" }}
                    showLabel
                    name="chamber_certificate_number"
                    i18nNamespace="dashboard.customers.Services.ChamberCertificate"
                    placeholder={{ id: "chamber_certificate_number.placeholder" }}
                />

                <Input
                    type="date"
                    label={{ id: "chamber_certificate_expiry.label" }}
                    showLabel
                    name="chamber_certificate_expiry"
                    i18nNamespace="dashboard.customers.Services.ChamberCertificate"
                    placeholder={{ id: "chamber_certificate_expiry.placeholder" }}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    type="date"
                    label={{ id: "chamber_certificate_issuance_date.label" }}
                    showLabel
                    name="chamber_certificate_issuance_date"
                    i18nNamespace="dashboard.customers.Services.ChamberCertificate"
                    placeholder={{ id: "chamber_certificate_issuance_date.placeholder" }}
                />

                <Input
                    label={{ id: "chamber_certificate_issuing_authority.label" }}
                    showLabel
                    name="chamber_certificate_issuing_authority"
                    i18nNamespace="dashboard.customers.Services.ChamberCertificate"
                    placeholder={{ id: "chamber_certificate_issuing_authority.placeholder" }}
                />
            </div>
        </fieldset>
    );
};

export default ChamberCertificate;
