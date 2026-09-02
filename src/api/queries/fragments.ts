export const COUNTRY_BASE_FRAGMENT = `
  fragment CountryBase on Country {
    code
    name
  }
`;

export const COUNTRY_DETAILS_FRAGMENT = `
  fragment CountryDetails on Country {
    ...CountryBase
    native
    capital
    currency
    emoji
  }
  ${COUNTRY_BASE_FRAGMENT}
`;

export const LANGUAGE_FRAGMENT = `
  fragment LanguageDetails on Language {
    code
    name
  }
`;
