import localFont from "next/font/local";
import { Urbanist, Rethink_Sans, Hanken_Grotesk } from "next/font/google";
import { getCountryCallingCode } from "libphonenumber-js";
import countries from "i18n-iso-countries";

// Make sure you import English names for i18n-iso-countries
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const getAllCountries = () => {
  return Object.entries(countries.getNames("en", { select: "official" }))
    .map(([code, name]) => {
      try {
        const callingCode = getCountryCallingCode(code);
        return { label: `${name} +${callingCode}`, value: code };
      } catch (error) {
        // Not all country codes may be supported by libphonenumber-js
        return null;
      }
    })
    .filter(Boolean); // Filter out null values if any country codes are unsupported
};

const COUNTRIES = getAllCountries();

const urbanist = Urbanist({ subsets: ["latin"] });
const rethinkSans = Rethink_Sans({ subsets: ["latin"] });
const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"] });

export { COUNTRIES, hankenGrotesk };
