export interface ISignup {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  refresh_token: string;
}
