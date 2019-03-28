export interface UserResponse {
  auth_token: string;
  message: string;
  user_info: UserDetail;
  status: number;
}

export interface UserDetail {
  id: number;
  name: string;
  email: string;
}

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  confirm_password: string;
}

export interface SignInData {
  email: string;
  password: string;
}
