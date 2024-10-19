
export interface ApiClient {
    get<T>(url: string, options?: object): Promise<T>;
    post<T>(url: string, data: T, options?: object): Promise<T>;
    put<T>(url: string, data: T, options?: object): Promise<T>;
    delete<T>(url: string, options?: object): Promise<T>;
  }