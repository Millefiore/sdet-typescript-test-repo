# Project Guidelines & AI Assistant Instructions

## Tech Stack & Architecture

- **Language**: TypeScript (Strict Mode)
- **Framework**: Playwright Test
- **Linter & Formatter:** oxc / oxfmt

- **Design Pattern**: Page Object Model (POM) for UI, API Client Wrapper for REST/GraphQL, Service Object Pattern for API
- **Reporting**: Allure Playwright
- **CI/CD**: GitHub Actions

## Code Style & Rules

- Use async/await for all Playwright actions.
- Always encapsulate page elements inside Page Objects (`src/ui/pages/`).
- Use step annotations via `allure.step()` for readability in reports.
- Avoid arbitrary hardcoded waits (`page.waitForTimeout()`); use explicit Playwright assertions (`expect(locator).toBeVisible()`).
- Keep UI assertions inside test files or high-level page methods, maintaining AAA (Arrange-Act-Assert) pattern.
- Tests must be completely isolated and stateless. Never rely on execution order between test files.
- Never hardcode secret credentials or URLs. Read them from `.env` via `process.env`.
- Focus on status codes, headers, and business logic data accuracy.
- Use `getByRole()`, `getByTestId()`, or `getByLabel()`. Raw XPath/CSS selectors are strictly forbidden without explicit code review.

## Common Commands

- Run all tests: `npx playwright test`
- Run UI tests: `npx playwright test tests/ui`
- Run API tests: `npx playwright test tests/api`
- Generate Allure Report: `npx allure generate ./allure-results --clean -o ./allure-report`
- Typecheck project: `npx tsc --noEmit`
- Format code: `npx oxfmt .`
