import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { ProductPage } from "./product.page";

export class HomePage extends BasePage {
  readonly productCards: Locator;

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
    this.productCards = page.locator("#page-content div");
  }

  async navigate(): Promise<void> {
    await super.navigate("/");
  }

  getProductCardByName(title: string): Locator {
    return this.productCards.locator("h3", { hasText: title });
  }

  async openProduct(title: string): Promise<ProductPage> {
    const card = this.getProductCardByName(title);
    await card.first().click();
    await this.page.waitForURL(/\/products\//);
    return new ProductPage(this.page, this.baseUrl);
  }
}
