import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly productPrice: Locator;

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
    this.addToCartButton = page.locator("#add");
    this.productPrice = page.locator(".product-price").first();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
