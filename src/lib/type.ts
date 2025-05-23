export interface IResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error: string | null;
}
