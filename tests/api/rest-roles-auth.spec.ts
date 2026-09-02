import { test, expect } from "../../src/api/fixtures/api.fixture";
import { allure } from "allure-playwright";
import { ADMIN_CREDENTIALS, USER_CREDENTIALS } from "../../src/api/data/auth.data";

test.describe.configure({ mode: "parallel" });

test.describe(
  "Authentication & Authorization Tests",
  { tag: ["@api", "@smoke", "@regression"] },
  () => {
    test("401 Unauthorized - Access protected endpoint without token", async ({ authClient }) => {
      await allure.feature("DummyJSON Auth");
      await allure.story("No Token");
      const { status } = await authClient.getMe("");

      expect(status).toBe(401);
    });

    test("401 Unauthorized - Invalid or expired token", async ({ authClient }) => {
      await allure.feature("DummyJSON Auth");
      await allure.story("Invalid Token");
      const { status } = await authClient.getMe("invalid_token_xyz");

      expect(status).toBe(401);
    });

    test("200 OK - Get user profile with valid Admin Bearer token", async ({ authClient }) => {
      await allure.feature("DummyJSON Auth");
      await allure.story("RBAC");
      const { status, body: login } = await authClient.login(ADMIN_CREDENTIALS);
      expect(status).toBe(200);
      expect(login.accessToken).toBeDefined();

      const me = await authClient.getMe(login.accessToken);

      expect(me.status).toBe(200);
      expect(me.body.username).toBe("emilys");
      expect(me.body.role).toBe("admin");
    });

    test("RBAC - Verify user roles in payload", async ({ authClient }) => {
      await allure.feature("DummyJSON Auth");
      await allure.story("RBAC");
      const { status, body: login } = await authClient.login(USER_CREDENTIALS);
      expect(status).toBe(200);

      const me = await authClient.getMe(login.accessToken);

      expect(me.body.role).toBe("user");
    });
  },
);
