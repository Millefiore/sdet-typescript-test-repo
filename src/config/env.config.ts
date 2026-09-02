import dotenv from "dotenv";
import path from "path";

const environment = process.env.ENV || "prod";
dotenv.config({ path: path.resolve(__dirname, `../../.env.${environment}`) });

export const Config = {
  authUiUrl: process.env.AUTH_UI_URL || "https://www.saucedemo.com/",
  defaultUiUrl: process.env.BASE_UI_URL || "https://sauce-demo.myshopify.com",
  restApiUrl: process.env.REST_API_URL || "https://reqres.in/api",
  restApiKey: process.env.REST_API_KEY || "",
  restApiAuthUrl: process.env.REST_API_AUTH_URL || "https://dummyjson.com",
  graphQlUrl: process.env.GRAPHQL_URL || "https://countries.trevorblades.com",
  env: environment,
  isHeadless: process.env.HEADLESS !== "false",
};
