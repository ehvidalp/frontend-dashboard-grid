import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiClient } from '../types';

const defaultBaseUrl = import.meta.env.VITE_API_BASE_URL;

class HttpClient implements ApiClient {
  private client: AxiosInstance;

  constructor(baseUrl?: string) {
    this.client = axios.create({
      baseURL: baseUrl || defaultBaseUrl,
      timeout: 1000,
    });
  }

  async get<T>(url?: string, options?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url || '', options);
    return response.data;
  }

  async post<T>(url: string, data: T, options?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, options);
    return response.data;
  }

  async put<T>(url: string, data: T, options?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, options);
    return response.data;
  }

  async delete<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, options);
    return response.data;
  }
}

export default HttpClient;