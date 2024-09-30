import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import StorageService from "./StorageService";
import routes from "../routes/config";
import _ from "lodash";
import ResourceHandler from "../exceptions/ResourceHandler";
import InvalidCredentials from "../exceptions/InvalidCredentials";

interface RouteConfig {
  path: string;
  requiresAuth: boolean;
}

interface ErrorType {
  type: "resource" | "authentication" | "server";
  name: string;
  message: string;
}

export default class ApiService {
  protected client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_BASE_URI,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add a request interceptor
    this.client.interceptors.request.use(
      (
        config: AxiosRequestConfig
      ):
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>> => {
        // Check if the request requires authentication
        if (this.isAuthenticatedRoute(config)) {
          const response = StorageService.getItem("authToken");

          if (_.isObject(response) && _.has(response, "token")) {
            const { token } = response;
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${token}`,
            };
          }
        }
        return config as
          | InternalAxiosRequestConfig<any>
          | Promise<InternalAxiosRequestConfig<any>>;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        // Handle errors globally
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Redirecting to login...");
        }
        return Promise.reject(error);
      }
    );
  }

  protected isAuthenticatedRoute(config: AxiosRequestConfig): boolean {
    // Check if the request URL is for an authenticated route
    // You can adjust the logic based on your requirements
    const authenticatedRoutes: string[] = routes
      .filter((item: RouteConfig) => item.requiresAuth)
      .map((item: RouteConfig) => item.path);
    return authenticatedRoutes.some((route) => config.url?.startsWith(route));
  }

  // Generic methods for HTTP requests
  async get<T>(
    url: string,
    params?: string | number
  ): Promise<AxiosResponse<T>> {
    const route = params ? `${url}/${params}` : url;
    return await this.client.get<T>(route);
  }

  async post<T>(url: string, data: object): Promise<AxiosResponse<T>> {
    return await this.client.post<T>(url, data);
  }

  async patch<T>(url: string, data: object): Promise<AxiosResponse<T>> {
    return await this.client.patch<T>(url, data);
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    return await this.client.delete<T>(url);
  }

  protected handleError(resource: ErrorType): void {
    const { type, name, message } = resource;
    switch (type) {
      case "resource":
        throw new ResourceHandler(name, message);

      case "authentication":
        throw new InvalidCredentials(name, message);

      default:
        throw new Error(message || "An unexpected error occurred");
      // break;
    }
  }
}
