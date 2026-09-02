import { test, expect } from "../../src/api/fixtures/api.fixture";
import { allure } from "allure-playwright";
import { createUserPayload } from "../../src/api/factories/user.factory";

test.describe.configure({ mode: "parallel" });

test.describe("ReqRes API - Users Management", { tag: ["@api", "@regression"] }, () => {
  test("POST /api/users - Create new user with valid payload", async ({ userClient }) => {
    await allure.feature("ReqRes API");
    await allure.story("User Creation");

    const newUserPayload = createUserPayload();

    const { status, body } = await userClient.createUser(newUserPayload);

    expect(status).toBe(201);
    expect(body.name).toBe(newUserPayload.name);
    expect(body.job).toBe(newUserPayload.job);
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
  });

  test("GET /api/users - Validate Paginated Response", async ({ userClient }) => {
    await allure.feature("ReqRes API");
    await allure.story("User Listing");

    const { status, body } = await userClient.getUsers(2);

    expect(status).toBe(200);
    expect(body.page).toBe(2);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty("email");
  });

  test("DELETE /api/users/:id - Delete User", async ({ userClient }) => {
    await allure.feature("ReqRes API");
    await allure.story("Delete User");

    const { status } = await userClient.deleteUser(2);

    expect(status).toBe(204);
  });
});
