const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const APP_URL = process.env.NEXT_APP_URL;
const currency = "AED";
const VatValue = 0.05;
const defaultLanguage = "en";
const languages = ["en", "ar"];
export {
  currency,
  VatValue,
  BASE_URL,
  languages,
  APP_URL,
  defaultLanguage,
  IMAGE_BASE_URL,
};
