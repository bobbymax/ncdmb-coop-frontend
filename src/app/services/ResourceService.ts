import { EntityProps } from "../hooks/useEntityManager";
import GuardedApiService from "./GuardedApiService";

interface JsonResponse {
  status: number;
  data: any;
}

export interface ViewJsonResponse {
  message?: string;
  status: string;
  record: EntityProps;
}

export default abstract class ResourceService extends GuardedApiService {
  static isAbstract = true;
  getResponse(response: JsonResponse): ViewJsonResponse {
    return {
      record: response.data?.data,
      message: response.data?.message,
      status: response.data?.status,
    };
  }

  async collection(url: string) {
    try {
      // Available variables Status | Data | Message
      const { status, data } = await this.get(url);

      return this.getResponse({ status, data });
    } catch (error) {
      this.handleError({
        type: "resource",
        name: "Collection",
        message: "This collection was not found in our records!!",
      });
    }
  }

  async store(url: string, body: object) {
    try {
      const { status, data } = await this.post(url, body);
      return this.getResponse({ status, data });
    } catch (error) {
      this.handleError({
        type: "server",
        name: "Record",
        message: "Creation of this record was unsuccessful",
      });
    }
  }

  async fetch(url: string, params: string | number) {
    try {
      const { status, data } = await this.get(url, params);
      return this.getResponse({ status, data });
    } catch (error) {
      this.handleError({
        type: "resource",
        name: "Model",
        message: "It appears that we do not have this record in our database.",
      });
    }
  }

  async update(url: string, param: string | number, body: object) {
    try {
      const { status, data } = await this.patch(`${url}/${param}`, body);
      return this.getResponse({ status, data });
    } catch (error) {
      // error.response.data.message
      this.handleError({
        type: "resource",
        name: "Model",
        message: "Updating this record was unsuccessful",
      });
    }
  }

  async destroy(url: string, param: string | number) {
    try {
      const { status, data } = await this.delete(`${url}/${param}`);
      return this.getResponse({ status, data });
    } catch (error) {
      this.handleError({
        type: "resource",
        name: "Resource",
        message: "This record did not update",
      });
    }
  }
}
