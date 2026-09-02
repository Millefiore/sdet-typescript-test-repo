---
name: generate-page-object
description: Generates a Playwright Page Object Model class from HTML snippets or DOM structures adhering to strict Playwright selector best practices.
---

# Page Object Generation Rules

1. Create or update a Page Object class in `tests/pages/`.
2. Follow strict Locator priority:
   - **1st choice:** `getByRole()`, `getByTestId()`, `getByLabel()`, `getByPlaceholder()`
   - **Avoid:** Raw CSS selectors like `.btn-primary` or long XPath like `//div[2]/button`
3. Encapsulate page actions inside methods.
4. Keep locators as `readonly` properties.

## Code Example

```typescript
import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Sign in" });
  }

  async login(username: string, pass: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }
}
```
