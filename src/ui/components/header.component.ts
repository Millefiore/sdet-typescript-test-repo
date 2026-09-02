import type { Page, Locator } from "@playwright/test";

export class HeaderComponent {
  readonly cartItemNumbers: Locator;

  constructor(page: Page) {
    this.cartItemNumbers = page.locator("#cart-target-desktop");
  }
}
