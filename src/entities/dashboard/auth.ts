export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ILoginResponse {
  access_token: string;
  user:{
roles:IRole[]
    password: string;
  }
  permissions: string[];
}
export interface ILogoutResponse {
  success: boolean;
  message: string;
}
interface IRole{
    id: string;
    name: string;
    code: string;
}