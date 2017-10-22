export class Response<T> {
  message: string;
  code: number;
  results: T;

  constructor(message: string, code: number, results: T) {
    this.message = message;
    this.code = code;
    this.results = results;
  }
}
