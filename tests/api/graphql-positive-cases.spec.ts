import { test, expect } from "../../src/api/fixtures/api.fixture";
import { allure } from "allure-playwright";
import * as Queries from "../../src/api/queries/queries";
import {
  VALID_COUNTRIES,
  VALID_COUNTRY_CODE,
  SPAIN_COUNTRY_DETAILS,
} from "../../src/api/data/countries.data";

test.describe("GraphQL API - Positive Business Scenarios", () => {
  test.beforeEach(async () => {
    await allure.feature("GraphQL API");
    await allure.story("Positive Business Scenarios");
  });

  test("Execute Valid Query with Fragments and Validate Response", async ({ graphQlClient }) => {
    const { status, body } = await graphQlClient.query(Queries.GET_COUNTRY_DETAILS, {
      code: VALID_COUNTRY_CODE,
    });

    expect(status).toBe(200);
    expect(body.errors).toBeUndefined();
    expect(body.data.country).toEqual(expect.objectContaining(SPAIN_COUNTRY_DETAILS));
  });

  for (const country of VALID_COUNTRIES) {
    test(`Fetch country details for code: ${country.code}`, async ({ graphQlClient }) => {
      const { status, body } = await graphQlClient.query(Queries.GET_COUNTRY_DETAILS, {
        code: country.code,
      });

      expect(status).toBe(200);
      expect(body.errors).toBeUndefined();
      expect(body.data.country.name).toBe(country.expectedName);
      expect(body.data.country.capital).toBe(country.expectedCapital);
    });
  }

  test("Execute Complex Nested Query (Continent -> Countries -> Languages)", async ({
    graphQlClient,
  }) => {
    const { status, body } = await graphQlClient.query(Queries.GET_CONTINENT_DATA, {
      code: "EU",
    });

    expect(status).toBe(200);
    expect(body.data.continent.name).toBe("Europe");
    expect(body.data.continent.countries.length).toBeGreaterThan(0);
    expect(body.data.continent.countries[0].languages).toBeDefined();
  });
});
