export interface GraphQlError {
  message: string;
}

// GraphQL responses are dynamic per-query; `any` keeps assertions on nested data untyped.
export interface GraphQlResponse {
  data: Record<string, any>;
  errors: GraphQlError[];
}
