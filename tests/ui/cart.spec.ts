import { test, expect } from "../../src/ui/fixtures/base.fixture";
import { allure } from "allure-playwright";
import { ProductPage } from "../../src/ui/pages/product.page";

test.describe("UI - Cart State Verification", { tag: ["@ui", "@regression"] }, () => {
  test("Add product to Cart From Home Page and Check Counter of Cart Icon in Header", async ({
    homePage,
  }) => {
    await allure.feature("Cart");
    await allure.story("Add Item");

    await allure.step("Go To HomePage", async () => {
      await homePage.navigate();
    });

    let productPage: ProductPage;

    await allure.step("Click On First Item", async () => {
      productPage = await homePage.openProduct("Grey jacket");
    });

    await allure.step("Add to Cart", async () => {
      await productPage.addToCart();
    });

    await allure.step("Check If Item Count is 1", async () => {
      await expect(productPage.header.cartItemNumbers).toContainText("1");
    });
  });

  test("Should not display product table and checkout form when cart is empty", async ({
    cartPage,
  }) => {
    await allure.feature("Cart");
    await allure.story("Empty State");

    await allure.step("Navigate directly to Cart Page without adding items", async () => {
      await cartPage.navigate();
    });

    await allure.step("Verify cart form and contents are not present in DOM/visible", async () => {
      await expect(cartPage.cartForm).not.toBeVisible();

      await expect(cartPage.cartRows).toHaveCount(0);
    });
  });
});
