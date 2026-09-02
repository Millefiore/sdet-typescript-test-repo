export const SAUCE_DEMO_PASSWORD = "secret_sauce" as const;

export interface UiUser {
  roleType: string;
  username: string;
  shouldLogin: boolean;
  expectedError?: string;
}

export const SAUCE_USERS: UiUser[] = [
  {
    roleType: "Standard User",
    username: "standard_user",
    shouldLogin: true,
  },
  {
    roleType: "Locked Out User",
    username: "locked_out_user",
    shouldLogin: false,
    expectedError: "Epic sadface: Sorry, this user has been locked out.",
  },
  {
    roleType: "Problem User",
    username: "problem_user",
    shouldLogin: true,
  },
  {
    roleType: "Performance Glitch User",
    username: "performance_glitch_user",
    shouldLogin: true,
  },
];
