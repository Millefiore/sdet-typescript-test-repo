import { test, expect } from "../../src/api/fixtures/api.fixture";
import { allure } from "allure-playwright";
import { PAGINATION_BOUNDARY_CASES } from "../../src/api/data/users.data";

test.describe(
  "ReqRes API - Advanced & Negative Scenarios",
  { tag: ["@api", "@regression"] },
  () => {
    test.beforeEach(async () => {
      await allure.feature("ReqRes API");
      await allure.story("Pagination Boundary Analysis");
    });

    test.describe("Boundary Value Analysis - Pagination", () => {
      for (const {
        page,
        expectedPage,
        description,
        expectEmptyData,
      } of PAGINATION_BOUNDARY_CASES) {
        test(`GET /api/users with page=${page} (${description})`, async ({ userClient }) => {
          const { status, body } = await userClient.getUsers(page);

          expect(status).toBe(200);
          expect(body.page).toBe(expectedPage);
          if (expectEmptyData) {
            expect(body.data).toEqual([]);
          }
        });
      }
    });
  },
);
