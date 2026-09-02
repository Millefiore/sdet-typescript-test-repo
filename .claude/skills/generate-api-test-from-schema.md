---
name: generate-api-test-from-schema
description: Generates Playwright API test specs. Does NOT generate schema validation tests.
---

# API Test Generation Guidelines

When given an API payload or endpoint:

1. Create a new test spec inside `tests/api/`.
2. **DO NOT generate tests for JSON/GraphQL schema validation.** Focus only on business logic, status codes, and data correctness.
3. Follow the AAA (Arrange-Act-Assert) pattern.
4. Wrap logic into `allure.step()` blocks.
5. Use Playwright's `APIRequestContext`.

## Code Example

````typescript
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('API Business Logic Tests', () => {
  test('Should create a user successfully', async ({ request }) => {
    let response;

    await allure.step('Arrange: Prepare user payload', async () => {
      // Setup payload
    });

    await allure.step('Act: Send POST request', async () => {
      response = await request.post('/api/users', { data: { name: 'Vio' } });
    });

    await allure.step('Assert: Verify status and business data (No schema validation)', async () => {
      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body.name).toBe('Vio');
      expect(body.id).toBeDefined();
    });
  });
});

# Page Object Generation Rules

1. Create or update a Page Object class in `tests/pages/`.
2. Follow strict Locator priority:
   - **1st choice:** `getByRole()`, `getByTestId()`, `getByLabel()`, `getByPlaceholder()`
   - **Avoid:** Raw CSS selectors like `.btn-primary` or long XPath like `//div[2]/button`
3. Encapsulate page actions inside methods.
4. Keep locators as `readonly` properties.

## Code Example

```typescript
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
  }

  async login(username: string, pass: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }
}
````
