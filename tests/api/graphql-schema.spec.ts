import { test, expect } from "../../src/api/fixtures/api.fixture";
import { allure } from "allure-playwright";
import * as Queries from "../../src/api/queries/queries";
import { INVALID_COUNTRY_CODE, MALICIOUS_COUNTRY_CODE } from "../../src/api/data/countries.data";

test.describe("GraphQL API - Schema & Type Validation", () => {
  test.beforeEach(async () => {
    await allure.feature("GraphQL API");
    await allure.story("Schema & Type Validation");
  });

  test("Return graphQL error when requesting non-existing field", async ({ graphQlClient }) => {
    const { status, body } = await graphQlClient.query(Queries.GET_INVALID_FIELD, { code: "ES" });

    expect([200, 400]).toContain(status);
    expect(body.errors).toBeDefined();
    expect(body.errors[0].message).toContain("Cannot query field");
  });

  test("Return schema validation error for invalid variable type", async ({ graphQlClient }) => {
    const { status, body } = await graphQlClient.query(Queries.SEARCH_COUNTRIES_BY_FILTER, {
      filter: { continent: 12345 },
    });

    expect([200, 400]).toContain(status);
    expect(body.errors).toBeDefined();
    expect(body.errors[0].message).toContain("String");
  });
});

test.describe("GraphQL API - Edge Cases & Security", () => {
  test.beforeEach(async () => {
    await allure.feature("GraphQL API");
    await allure.story("Edge Cases & Security");
  });

  test("Return null data for non-existent country code", async ({ graphQlClient }) => {
    const { status, body } = await graphQlClient.query(Queries.GET_COUNTRY_DETAILS, {
      code: INVALID_COUNTRY_CODE,
    });

    expect(status).toBe(200);
    expect(body.errors).toBeUndefined();
    expect(body.data.country).toBeNull();
  });

  test("Return null data when code parameter is empty string", async ({ graphQlClient }) => {
    const { status, body } = await graphQlClient.query(Queries.GET_COUNTRY_DETAILS, {
      code: "",
    });

    expect(status).toBe(200);
    expect(body.data.country).toBeNull();
  });

  test("Handle malicious SQL/XSS payload in variables safely", async ({ graphQlClient }) => {
    const { status, body } = await graphQlClient.query(Queries.GET_COUNTRY_DETAILS, {
      code: MALICIOUS_COUNTRY_CODE,
    });

    expect(status).toBe(200);
    expect(body.data.country).toBeNull();
  });
});
