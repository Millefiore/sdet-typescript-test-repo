import { APIRequestContext } from "@playwright/test";
import { BaseClient } from "./base.client";
import { Config } from "../../config/env.config";
import { AuthLoginPayload, AuthLoginResponse, AuthUserProfile } from "../models/auth.model";

export class AuthClient extends BaseClient {
  constructor(request: APIRequestContext, baseUrl: string = Config.restApiAuthUrl) {
    super(request, baseUrl);
  }

  login(payload: AuthLoginPayload) {
    return this.send<AuthLoginResponse>("post", "/auth/login", { data: payload });
  }

  getMe(token: string) {
    return this.send<AuthUserProfile>("get", "/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
