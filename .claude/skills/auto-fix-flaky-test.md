---
name: auto-fix-flaky-test
description: Analyzes Playwright test logs, identifies flaky assertions, and refactors test code with web-first assertions.
---

# Instructions for Fixing Flaky or Failing Tests

1. Execute `npx playwright test`.
2. Analyze the trace or error log.
3. Fix the test following these rules:
   - DO NOT add arbitrary `await page.waitForTimeout()`.
   - Use web-first assertions (`toBeVisible`, `toHaveText`).
   - Use robust locators (`getByRole`, `getByTestId`).

## Code Example: Bad vs Good

**BAD (Do not write this):**

```typescript
await page.locator('.btn-primary').click();
await page.waitForTimeout(3000); // Anti-pattern
const text = await page.locator('#status').textContent();
expect(text).toBe('Success');

**GOOD (Write this instead):**
TypeScript
await page.getByRole('button', { name: 'Submit' }).click();
// Web-first assertion automatically waits for the element and state
await expect(page.getByTestId('status-message')).toHaveText('Success');
```
