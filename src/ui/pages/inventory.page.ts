import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);

    this.title = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.title).toHaveText("Products");
  }
}
