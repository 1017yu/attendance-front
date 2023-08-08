export interface ISignUp {
  profileUrl: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  hireDate: string;
  department: string;
  [key: string]: string;
}

export interface ISignUpRequestBody {
  profileUrl?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  hireDate: string;
  department: string;
}

export interface IRegexCheck {
  valid?: boolean;
  name?: string;
}
