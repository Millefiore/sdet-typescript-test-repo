import { LoginPayload, RegisterPayload } from "../models/user.model";

export const NON_EXISTENT_USER_ID = 999999;

export interface RoleTestUser {
  id: number;
  roleType: string;
  credentials: LoginPayload;
}

export const ROLE_TEST_USERS: RoleTestUser[] = [
  {
    id: 1,
    roleType: "Admin",
    credentials: { email: "george.bluth@reqres.in", password: "password123" },
  },
  {
    id: 2,
    roleType: "User",
    credentials: { email: "janet.weaver@reqres.in", password: "password123" },
  },
];

export const INVALID_LOGIN_PAYLOADS: Array<{ title: string; payload: LoginPayload }> = [
  {
    title: "missing password",
    payload: { email: "peter@klaven" },
  },
  {
    title: "unregistered email",
    payload: { email: "nonexistent_user_999@reqres.in", password: "Password123!" },
  },
];

export const INVALID_REGISTER_PAYLOADS: Array<{ title: string; payload: RegisterPayload }> = [
  {
    title: "missing password during registration",
    payload: { email: "sydney@fife" },
  },
];

export interface PaginationCase {
  page: number;
  expectedPage: number;
  description: string;
  expectEmptyData?: boolean;
}

export const PAGINATION_BOUNDARY_CASES: PaginationCase[] = [
  { page: 1, expectedPage: 1, description: "first page" },
  { page: 2, expectedPage: 2, description: "second page" },
  {
    page: 9999,
    expectedPage: 9999,
    description: "out of range page (empty data expected)",
    expectEmptyData: true,
  },
  { page: 0, expectedPage: 1, description: "edge case page 0 falls back to page 1" },
];
