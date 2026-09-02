import { COUNTRY_BASE_FRAGMENT, COUNTRY_DETAILS_FRAGMENT, LANGUAGE_FRAGMENT } from "./fragments";

export const GET_COUNTRY_DETAILS = `
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      ...CountryDetails
    }
  }
  ${COUNTRY_DETAILS_FRAGMENT}
`;

export const GET_INVALID_FIELD = `
  query GetInvalidField($code: ID!) {
    country(code: $code) {
      nonExistingField
    }
  }
`;

export const GET_CONTINENT_DATA = `
  query GetComplexContinentData($code: ID!) {
    continent(code: $code) {
      name
      countries {
        ...CountryBase
        languages {
          ...LanguageDetails
        }
      }
    }
  }
  ${COUNTRY_BASE_FRAGMENT}
  ${LANGUAGE_FRAGMENT}
`;

export const SEARCH_COUNTRIES_BY_FILTER = `
  query GetCountriesByFilter($filter: CountryFilterInput) {
    countries(filter: $filter) {
      ...CountryBase
      continent {
        code
      }
    }
  }
  ${COUNTRY_BASE_FRAGMENT}
`;

export const GET_CONTINENT_COUNTRIES = `
  query GetContinent($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
      }
    }
  }
`;

export const GET_COUNTRY_WITH_AUTH_CHECK = `
  query GetCountryWithAuthCheck($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      phone
      currency
    }
  }
`;
