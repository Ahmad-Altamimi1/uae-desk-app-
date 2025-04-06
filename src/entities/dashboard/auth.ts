export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ILoginResponse {
  user: {
    access_token: string;
  };
  password: string;
}
