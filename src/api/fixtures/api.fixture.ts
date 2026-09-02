import { test as base } from "@playwright/test";
import { UserClient } from "../clients/user.client";
import { GraphQLClient } from "../clients/graphql.client";
import { AuthClient } from "../clients/auth.client";

type ApiFixtures = {
  userClient: UserClient;
  graphQlClient: GraphQLClient;
  authClient: AuthClient;
};

export const test = base.extend<ApiFixtures>({
  userClient: async ({ request }, use) => {
    await use(new UserClient(request));
  },
  graphQlClient: async ({ request }, use) => {
    await use(new GraphQLClient(request));
  },
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },
});

export { expect } from "@playwright/test";
