export interface AuthLoginPayload {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
