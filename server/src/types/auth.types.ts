export interface SignUpInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpwd: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  token: string;
}
