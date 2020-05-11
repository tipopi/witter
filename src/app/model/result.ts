export interface Result<T> {
  meta: {
    code: number;
    message: string;
    token: string;
  };
  data: T;
}
