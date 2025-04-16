import Input from "@/components/form/input";
import { FaFileContract } from "react-icons/fa6";

const TradeLicense = () => {
    return (
        <fieldset className="space-y-4">
            <div className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <FaFileContract /> Trade License
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    label={{ id: "trade_license_number.label" }}
                    showLabel
                    name="trade_license_number"
                    i18nNamespace="dashboard.customers.Services.TradeLicense"
                    placeholder={{ id: "trade_license_number.placeholder" }}
                />
                <Input
                    type="date"
                    label={{ id: "trade_license_expiry.label" }}
                    showLabel
                    name="trade_license_expiry"
                    i18nNamespace="dashboard.customers.Services.TradeLicense"
                    placeholder={{ id: "trade_license_expiry.placeholder" }}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    type="date"
                    label={{ id: "trade_license_issuance_date.label" }}
                    showLabel
                    name="trade_license_issuance_date"
                    i18nNamespace="dashboard.customers.Services.TradeLicense"
                    placeholder={{ id: "trade_license_issuance_date.placeholder" }}
                />
                <Input
                    label={{ id: "trade_license_issuing_authority.label" }}
                    showLabel
                    name="trade_license_issuing_authority"
                    i18nNamespace="dashboard.customers.Services.TradeLicense"
                    placeholder={{ id: "trade_license_issuing_authority.placeholder" }}
                />
            </div>
        </fieldset>
    );
};

export default TradeLicense;
