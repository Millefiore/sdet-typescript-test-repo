import type { Page } from "@playwright/test";
import { HeaderComponent } from "../components/header.component";

export abstract class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
    this.header = new HeaderComponent(page);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigate(path: string = "") {
    const cleanPath = path ? `/${path.replace(/^\//, "")}` : "";
    await this.page.goto(`${this.baseUrl}${cleanPath}`);
  }

  getCurrentUrl(path: string = ""): string {
    const cleanPath = path ? `/${path.replace(/^\//, "")}` : "";
    return `${this.baseUrl}${cleanPath}`;
  }
}
