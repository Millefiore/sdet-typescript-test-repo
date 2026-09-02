---
name: refactor-codebase
description: Refactors existing test specs, Page Objects, and API clients to match Senior SDET project standards without altering test behavior.
---

# Code Refactoring Standards

Use this skill when asked to review, clean up, or refactor code in the repository.

## 1. General Rules

- **Behavioral Preservation:** Refactoring must NOT break existing tests or change assertion logic.
- **Strict Typing:** Remove `any` types. Introduce explicit TypeScript interfaces for options, payloads, and response objects.
- **Clean Code:** Remove dead code, commented-out logic, and unused imports.

## 2. API Layer Refactoring Rules

- Extract raw inline HTTP calls (`request.get`, `request.post`) into dedicated Client or Service Object classes under `src/api/clients/`.
- Wrap API client responses in typed objects (`status`, `headers`, `body`).

## 3. UI & Page Object Refactoring Rules

- Replace raw CSS/XPath selectors (`.btn`, `//div[2]/input`) with Playwright web-first locators (`getByRole`, `getByTestId`, `getByLabel`).
- Move inline page element locators from `.spec.ts` files into Page Object classes under `tests/pages/`.
- Remove manual waits like `await page.waitForTimeout()`.

## Code Example: Refactoring API & UI Code

**BEFORE Refactoring (Anti-pattern):**

```typescript
// tests/e2e/login.spec.ts
test('login and fetch profile', async ({ page, request }) => {
  await page.goto('/login');
  await page.locator('#email-input').fill('user@test.com');
  await page.locator('.btn-primary').click();
  await page.waitForTimeout(3000);

  const res = await request.get('/api/me');
  const data = await res.json();
  expect(data.name).toBe('User');
});

**AFTER Refactoring (Clean Architecture):**

// 1. Extracted Page Object
export class LoginPage {
  readonly emailInput = this.page.getByLabel('Email address');
  readonly submitButton = this.page.getByRole('button', { name: 'Sign in' });

  constructor(private readonly page: Page) {}

  async login(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}

// 2. Extracted API Client
export class UserApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async getCurrentUser() {
    const response = await this.request.get('/api/me');
    return {
      status: response.status(),
      body: (await response.json()) as UserProfile,
    };
  }
}

// 3. Clean Spec File
test('login and fetch profile', async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const userClient = new UserApiClient(request);

  await page.goto('/login');
  await loginPage.login('user@test.com');

  const { status, body } = await userClient.getCurrentUser();
  expect(status).toBe(200);
  expect(body.name).toBe('User');
});
```
