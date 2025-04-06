export type ErrorResponse = {
  type: string;
  title: string;
  status: number;
  errors: {
    [key: string]: string;
  };
  traceId: string;
  code?: string;
  message?: string;
};
