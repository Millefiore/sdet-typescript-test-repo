import { BaseClient } from "./base.client";
import { Config } from "../../config/env.config";
import {
  CreateUserPayload,
  UserResponse,
  PaginatedUsersResponse,
  SingleUserResponse,
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  ErrorResponse,
} from "../models/user.model";

export class UserClient extends BaseClient {
  private readonly endpoint = "/users";

  protected override getHeaders(): Record<string, string> {
    const headers = super.getHeaders();
    if (Config.restApiKey) {
      headers["x-api-key"] = Config.restApiKey;
    }
    return headers;
  }

  getUsers(page: number = 1) {
    return this.send<PaginatedUsersResponse>("get", this.endpoint, { params: { page } });
  }

  createUser(payload: CreateUserPayload) {
    return this.send<UserResponse>("post", this.endpoint, { data: payload });
  }

  deleteUser(userId: number | string) {
    return this.send<never>("delete", `${this.endpoint}/${userId}`);
  }

  getUserById(userId: number | string) {
    return this.send<SingleUserResponse | ErrorResponse>("get", `${this.endpoint}/${userId}`);
  }

  register(payload: RegisterPayload) {
    return this.send<RegisterResponse | ErrorResponse>("post", "/register", { data: payload });
  }

  login(payload: LoginPayload) {
    return this.send<LoginResponse | ErrorResponse>("post", "/login", { data: payload });
  }
}
