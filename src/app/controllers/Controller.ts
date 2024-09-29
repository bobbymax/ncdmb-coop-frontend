import { AssociatesProps } from "../models/Model";
import ResourceService, { ViewJsonResponse } from "../services/ResourceService";

export default abstract class Controller extends ResourceService {
  public url!: string;
  // Static map to hold instances of child classes
  private static instances: Map<string, Controller> = new Map();

  // Static method to get or create an instance of the child class
  public static init<T extends Controller>(this: new () => T): T {
    const className = this.name; // Get the name of the calling child class

    if (!Controller.instances.has(className)) {
      // If the instance does not exist, create a new one
      const instance = new this(); // 'this' refers to the calling child class
      Controller.instances.set(className, instance);
    }

    // Return the instance of the child class
    return Controller.instances.get(className) as T;
  }

  protected associates!: AssociatesProps[];

  async createOrUpdate(
    url: string,
    body: object,
    action: "store" | "update",
    param?: string | number
  ): Promise<ViewJsonResponse | undefined> {
    if (action === "update") {
      if (param === undefined) {
        throw new Error("ID parameter is required for update action.");
      }
      return await this.update(url, param, body);
    }

    return await this.store(url, body);
  }

  async getDependencies(): Promise<object> {
    if (this.associates.length < 1) {
      return {};
    }

    const requests = this.associates.map((item) => this.client.get(item.url));
    const responses = await Promise.all(requests);
    const collection = responses.map((res) => res.data?.data);

    return collection.reduce((acc, resSet, i) => {
      acc[this.associates[i].name] = resSet;
      return acc;
    }, {});
  }
}
