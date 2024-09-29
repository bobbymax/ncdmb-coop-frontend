import _ from "lodash";

interface AuthResponse {
  token?: string;
  user?: object;
}

export default class StorageService {
  // Add data to local storage
  static setItem(key: string, value: any): void {
    try {
      let serializedValue;

      if (_.isObject(value) && _.has(value, "data")) {
        const { data } = value;
        serializedValue = data;
      } else {
        serializedValue = value;
      }
      localStorage.setItem(
        key,
        StorageService.storageStringify(serializedValue)
      );
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  }

  // Get data from local storage
  static getItem(key: string): AuthResponse | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as AuthResponse;
    } catch (error) {
      console.error("Error reading from local storage", error);
      return null;
    }
  }

  // Remove data from local storage
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from local storage", error);
    }
  }

  // Clear all data from local storage
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing local storage", error);
    }
  }

  static storageStringify(data: AuthResponse): string {
    return JSON.stringify(data);
  }
}
