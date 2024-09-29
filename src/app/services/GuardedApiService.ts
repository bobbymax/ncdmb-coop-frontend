import ApiService from "./ApiService";
import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import StorageService from "./StorageService";
import _ from "lodash";

export default class GuardedApiService extends ApiService {
  constructor() {
    super();

    // Add a request interceptor
    this.client.interceptors.request.use(
      (
        config: AxiosRequestConfig
      ):
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>> => {
        // Check if the request requires authentication
        const response = StorageService.getItem("authToken");

        if (_.isObject(response) && _.has(response, "token")) {
          const { token } = response;
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
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

  async logout(): Promise<void> {
    try {
      StorageService.removeItem("authToken");
      await this.client.get("logout", {});
    } catch (error) {
      this.handleError({
        type: "server",
        name: "Member",
        message: "The logout logic was not successful",
      });
      throw error;
    }
  }
}
