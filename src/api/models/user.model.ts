export interface CreateUserPayload {
  name: string;
  job: string;
}

export interface UserResponse {
  id: string;
  name: string;
  job: string;
  createdAt: string;
}

export interface UserItem {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface PaginatedUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserItem[];
}

export interface SingleUserResponse {
  data: UserItem;
}

export interface RegisterPayload {
  email: string;
  password?: string;
}

export interface RegisterResponse {
  id: number;
  token: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
}

export interface ErrorResponse {
  error: string;
}
