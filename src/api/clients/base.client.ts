import { APIRequestContext } from "@playwright/test";
import { Config } from "../../config/env.config";

export interface ApiResponse<T> {
  status: number;
  body: T;
}

type HttpMethod = "get" | "post" | "delete";

interface SendOptions {
  data?: unknown;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

export abstract class BaseClient {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly baseUrl: string = Config.restApiUrl,
  ) {}

  protected getHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  protected async send<T>(
    method: HttpMethod,
    path: string,
    options: SendOptions = {},
  ): Promise<ApiResponse<T>> {
    const response = await this.request[method](`${this.baseUrl}${path}`, {
      headers: { ...this.getHeaders(), ...options.headers },
      data: options.data,
      params: options.params,
    });

    const rawBody = await response.body();
    const body = rawBody.length
      ? (JSON.parse(rawBody.toString("utf-8")) as T)
      : (undefined as unknown as T);

    return { status: response.status(), body };
  }
}
