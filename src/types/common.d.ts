export interface CommonResponse<T> {
  code: number;
  isSuccess: boolean;
  message: string;
  result: T;
}
