export interface CountryCase {
  code: string;
  expectedName: string;
  expectedCapital: string;
}

export const VALID_COUNTRIES: CountryCase[] = [
  { code: "US", expectedName: "United States", expectedCapital: "Washington D.C." },
  { code: "DE", expectedName: "Germany", expectedCapital: "Berlin" },
  { code: "ES", expectedName: "Spain", expectedCapital: "Madrid" },
  { code: "UA", expectedName: "Ukraine", expectedCapital: "Kyiv" },
];

export const VALID_COUNTRY_CODE = "ES";

export const INVALID_COUNTRY_CODE = "INVALID_XYZ";

export const MALICIOUS_COUNTRY_CODE = "' OR '1'='1'; DROP TABLE Countries; --";

export const SPAIN_COUNTRY_DETAILS = {
  name: "Spain",
  native: "España",
  capital: "Madrid",
  currency: "EUR",
} as const;
