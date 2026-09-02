import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly cartSection: Locator;
  readonly cartForm: Locator;
  readonly cartRows: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
    this.cartItems = page.locator(".cart__row");
    this.checkoutButton = page.getByRole("button", { name: /check out/i });
    this.cartSection = page.locator("section#cart");
    this.cartForm = page.locator('form[action="/cart"]');
    this.cartRows = page.locator("section#cart .row");
    this.emptyCartMessage = page.locator("section#cart p, #page-content p");
  }

  async navigate(): Promise<void> {
    await super.navigate("/cart");
  }

  getCartItemByName(title: string): Locator {
    return this.cartItems.filter({ hasText: title });
  }
}
