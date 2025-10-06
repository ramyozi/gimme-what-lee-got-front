import axios, { type AxiosInstance } from "axios";
import {z} from "zod";
import type {Fetcher} from "swr";

/**
 * @description ApiClient is a singleton class that provides a baseUrl and an instance of axios.
 * It also provides a getFetcher method that returns a function that fetches data from the api for swr.
 * to access axios instance use apiClient.instance so you can make requests with it. Eg: apiClient.instance.get('/endpoint')
 */
export class ApiClient {
  public instance: AxiosInstance;
  public multiPartInstance: AxiosInstance;
  private readonly baseUrl: string;

  constructor(config: { baseUrl: string }) {
    if (!z.string().safeParse(config.baseUrl).success) {
      console.warn('Invalid API URL');
    }

    this.baseUrl = config.baseUrl;
    this.instance = this.buildInstance();
    this.multiPartInstance = this.buildMultiPartInstance();
  }

  public buildInstance(): AxiosInstance {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return this.instance;
  }

  public buildMultiPartInstance(): AxiosInstance {
    this.multiPartInstance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return this.multiPartInstance;
  }

  public getFetcher(): Fetcher<any, string> {
  return async (url: string): Promise<any> => {
    const fullUrl = `${this.baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
    const response = await axios.get(fullUrl, { withCredentials: true });
    return response.data;
  };
}
}

export const apiClient = new ApiClient({
  baseUrl: import.meta.env.VITE_API_BASE as string,    
});
