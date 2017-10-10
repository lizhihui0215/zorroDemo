export interface Response<T> {
  message: string;
  code: number;
  results: T;
}
