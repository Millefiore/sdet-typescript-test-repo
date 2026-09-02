import { test, expect } from "../../src/ui/fixtures/base.fixture";
import { allure } from "allure-playwright";
import { SAUCE_USERS } from "../../src/ui/data/ui-users.data";

test.describe.configure({ mode: "parallel" });

test.describe(
  "UI - Authentication & Role Access Verification",
  { tag: ["@ui", "@regression"] },
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await allure.feature("Login");
      await allure.story("Role-Based Access");
      await loginPage.navigate();
    });

    test.describe("Parameterized Auth Scenarios for Different User Roles", () => {
      for (const user of SAUCE_USERS) {
        test(`Login attempt as ${user.roleType} (${user.username})`, async ({
          loginPage,
          inventoryPage,
        }) => {
          await loginPage.login(user.username);

          if (user.shouldLogin) {
            await inventoryPage.expectLoaded();
          } else {
            await loginPage.expectErrorMessage(user.expectedError!);
          }
        });
      }
    });

    test.describe("Security & Unauthorized Access Controls", () => {
      test("Redirect to login page when trying to open inventory page directly without auth", async ({
        loginPage,
        inventoryPage,
        page,
      }) => {
        await inventoryPage.navigate("/inventory.html");

        await expect(page).toHaveURL(loginPage.getCurrentUrl("/"));

        await loginPage.expectErrorMessage(
          "Epic sadface: You can only access '/inventory.html' when you are logged in.",
        );
      });
    });
  },
);
