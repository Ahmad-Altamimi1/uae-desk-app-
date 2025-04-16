import Input from "@/components/form/input";
import { FaFileInvoiceDollar } from "react-icons/fa6";

const VatCertificate = () => {
    return (
        <fieldset className="space-y-4 mb-4">
            <div className="text-lg font-medium text-gray-900 flex items-center gap-2 border-b-2 border-yellow-500 pb-1">
                <FaFileInvoiceDollar /> VAT Registration Certificate Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label={{ id: "vat_certificate_number.label" }}
                    showLabel
                    name="vat_certificate_number"
                    i18nNamespace="dashboard.customers.Services.VatCertificate"
                    placeholder={{ id: "vat_certificate_number.placeholder" }}
                />

                <Input
                    type="date"
                    label={{ id: "vat_certificate_date.label" }}
                    showLabel
                    name="vat_certificate_date"
                    i18nNamespace="dashboard.customers.Services.VatCertificate"
                    placeholder={{ id: "vat_certificate_date.placeholder" }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="date"
                    label={{ id: "vat_certificate_expiry.label" }}
                    showLabel
                    name="vat_certificate_expiry"
                    i18nNamespace="dashboard.customers.Services.VatCertificate"
                    placeholder={{ id: "vat_certificate_expiry.placeholder" }}
                />

                <Input
                    label={{ id: "vat_certificate_authority.label" }}
                    showLabel
                    name="vat_certificate_authority"
                    i18nNamespace="dashboard.customers.Services.VatCertificate"
                    placeholder={{ id: "vat_certificate_authority.placeholder" }}
                />
            </div>
        </fieldset>
    );
};

export default VatCertificate;
