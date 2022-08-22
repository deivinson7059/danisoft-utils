export interface apiResponse<T = any> {
  error: boolean;
  data: T;
}

export interface modelsResponse<T = string> {
  isError: boolean;
  isEmpty: boolean;
  isOk?: boolean;
  data?: T;
  Error?: Error | unknown;
}
