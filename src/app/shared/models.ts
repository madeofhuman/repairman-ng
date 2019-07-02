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

export interface Car {
  id?: number;
  make: string;
  year: number;
  model: string;
  trim: string;
  quotes?: Quote[];
  created_by?: number;
  created_at?: string;
  updated_at?: string;
  data?: any;
}

export interface Quote {
  id?: number;
  car_id?: number;
  comments?: Comment[];
  descripiton: string;
  created_at?: string;
  updated_at?: string;
}

export interface Comment {
  id?: number;
  quote_id?: number;
  text: string;
  created_at?: string;
  updated_at?: string;
}
