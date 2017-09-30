export interface Response<T> {
  message: string;
  code: number;
  result: T;
}
