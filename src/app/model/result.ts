export interface Result<T>{
  meta: {
    code: number;
    msg: string;
    token: string;
  };
  data: T;
}
