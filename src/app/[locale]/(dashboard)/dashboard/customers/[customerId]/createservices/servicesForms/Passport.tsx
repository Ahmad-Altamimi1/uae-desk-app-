import React from "react";

const Passport = () => {
  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-medium text-gray-900">
        <i className="fas fa-passport mr-2" /> Passport Details Section
      </legend>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="passport_number" className="sr-only">
            Passport Number
          </label>
          <input
            type="text"
            id="passport_number"
            name="passport_number"
            placeholder="Enter passport number"
            value={old(
              "passport_number",
              $customerDetails["passport"]["number"] ?? ""
            )}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="passport_expiry" className="sr-only">
            Passport Expiry
          </label>
          <input
            type="date"
            id="passport_expiry"
            name="passport_expiry"
            value={old(
              "passport_expiry",
              $customerDetails["passport"]["expiry"] ?? ""
            )}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="passport_issuing_country" className="sr-only">
            Issuing Country
          </label>
          <select
            id="passport_issuing_country"
            name="passport_issuing_country"
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select Issuing Country</option>
            {$countries.map((country) => (
              <option
                key={country}
                value={country}
                selected={
                  old(
                    "passport_issuing_country",
                    $customerDetails["passport"]["issuing_country"] ?? ""
                  ) === country
                }
              >
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="passport_holder_name" className="sr-only">
            Passport Holder Name
          </label>
          <input
            type="text"
            id="passport_holder_name"
            name="passport_holder_name"
            placeholder="Enter passport holder name"
            value={old(
              "passport_holder_name",
              $customerDetails["passport"]["holder_name"] ?? ""
            )}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default Passport;
