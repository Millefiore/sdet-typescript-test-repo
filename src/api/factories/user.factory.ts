import { faker } from "@faker-js/faker";
import { CreateUserPayload } from "../models/user.model";

export function createUserPayload(overrides: Partial<CreateUserPayload> = {}): CreateUserPayload {
  return {
    name: faker.person.fullName(),
    job: faker.person.jobTitle(),
    ...overrides,
  };
}
