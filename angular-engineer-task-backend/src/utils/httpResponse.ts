export interface Response<T> {
  data: T;
}

export function getResponse<T>(data: T): Response<T> {
  return {
    data,
  };
}
