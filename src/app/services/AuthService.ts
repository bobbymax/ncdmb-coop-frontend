import ApiService from "./ApiService";
import { AxiosResponse } from "axios";
import StorageService from "./StorageService";

interface Credentials {
  username: string;
  password: string;
}

interface RegistrationData {
  email: string;
  password: string;
  name: string;
}

export default class AuthService extends ApiService {
  async login<T>(credentials: Credentials): Promise<AxiosResponse<T>> {
    try {
      const response = await this.post<T>("login", credentials);
      StorageService.setItem("authToken", response.data);

      return response;
    } catch (error) {
      this.handleError({
        type: "authentication",
        name: "Member",
        message: "Invalid Credentials",
      });
      throw error;
    }
  }

  async register<T>(data: RegistrationData): Promise<AxiosResponse<T>> {
    try {
      return await this.post<T>("register", data);
    } catch (error) {
      this.handleError({
        type: "server",
        name: "Member",
        message: "Registration was unsuccessful",
      });
      throw error;
    }
  }
}
