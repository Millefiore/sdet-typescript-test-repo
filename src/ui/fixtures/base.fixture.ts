import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { CartPage } from "../pages/cart.page";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { Config } from "../../config/env.config";

type MyFixtures = {
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page, Config.defaultUiUrl));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page, Config.defaultUiUrl));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page, Config.defaultUiUrl));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page, Config.authUiUrl));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page, Config.authUiUrl));
  },
});

export { expect } from "@playwright/test";
