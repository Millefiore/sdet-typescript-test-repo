import { APIRequestContext } from "@playwright/test";
import { BaseClient } from "./base.client";
import { Config } from "../../config/env.config";
import { GraphQlResponse } from "../models/graphql.model";

export class GraphQLClient extends BaseClient {
  constructor(request: APIRequestContext) {
    super(request, Config.graphQlUrl);
  }

  query<T = GraphQlResponse>(
    query: string,
    variables?: Record<string, unknown>,
    headers?: Record<string, string>,
  ) {
    return this.send<T>("post", "", { data: { query, variables }, headers });
  }
}
