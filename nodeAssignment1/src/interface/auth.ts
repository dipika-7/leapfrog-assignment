export interface ISignup {
  userId: string;
  username: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  userId: string;
  username: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}
