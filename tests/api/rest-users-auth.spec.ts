import { test, expect } from "../../src/api/fixtures/api.fixture";
import { allure } from "allure-playwright";
import {
  ROLE_TEST_USERS,
  INVALID_LOGIN_PAYLOADS,
  INVALID_REGISTER_PAYLOADS,
  NON_EXISTENT_USER_ID,
} from "../../src/api/data/users.data";
import { SingleUserResponse, ErrorResponse } from "../../src/api/models/user.model";

test.describe.configure({ mode: "parallel" });

test.describe(
  "ReqRes API - Users, Authentication & Authorization",
  { tag: ["@api", "@regression"] },
  () => {
    test.beforeEach(async () => {
      await allure.feature("ReqRes API");
      await allure.story("Users, Authentication & Authorization");
    });

    test.describe("Authentication & Registration Negative Scenarios", () => {
      for (const { title, payload } of INVALID_LOGIN_PAYLOADS) {
        test(`POST /login - Fail login with ${title} (400)`, async ({ userClient }) => {
          const { status, body } = await userClient.login(payload);

          expect(status).toBe(400);
          expect((body as ErrorResponse).error).toBeDefined();
        });
      }

      for (const { title, payload } of INVALID_REGISTER_PAYLOADS) {
        test(`POST /register - Fail registration with ${title} (400)`, async ({ userClient }) => {
          const { status, body } = await userClient.register(payload);

          expect(status).toBe(400);
          expect((body as ErrorResponse).error).toBe("Missing password");
        });
      }

      test("GET /users/:id - Return 404 for non-existing user", async ({ userClient }) => {
        const { status } = await userClient.getUserById(NON_EXISTENT_USER_ID);

        expect(status).toBe(404);
      });
    });

    test.describe("Roles Verification", () => {
      for (const user of ROLE_TEST_USERS) {
        test(`GET /users/:id - Verify user profile data for ${user.roleType} (ID: ${user.id})`, async ({
          userClient,
        }) => {
          const { status, body } = await userClient.getUserById(user.id);

          expect(status).toBe(200);

          const userBody = body as SingleUserResponse;
          expect(userBody.data.id).toBe(user.id);
          expect(userBody.data.email).toBe(user.credentials.email);
        });
      }
    });
  },
);
