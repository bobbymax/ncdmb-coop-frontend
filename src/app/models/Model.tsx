import { ConditionalArray } from "../helpers/Helpers";
import { ViewJsonResponse } from "../services/ResourceService";

export interface ModelColumnsProps {
  label: string;
  accessor: string;
  type?: "text" | "currency" | "array" | "badge" | "boolean" | "image";
}

export interface ResourceProps {
  id: number;
}

export interface ModelTimestampProps extends ResourceProps {
  created_at: Date;
  updated_at: Date;
}

export interface DataResponseAction extends ViewJsonResponse {
  action: "store" | "update" | "destroy";
}

export interface TableBttnProps {
  action:
    | "update"
    | "destroy"
    | "external"
    | "block"
    | "guarantors"
    | "view"
    | "schedule"
    | "print";
  label?: string;
  icon?: string;
  isDisabled: boolean;
  variant?: "success" | "info" | "warning" | "danger";
  conditions: ConditionalArray[];
  terms: "and" | "or";
}

export interface AssociatesProps {
  url: string;
  name: string;
}

export default abstract class Model {
  private static instances: Map<string, Model> = new Map();
  public path: string = "";

  // Static method to get or create an instance of the child class
  public static init<T extends Model>(this: new () => T): T {
    const className = this.name; // Get the name of the calling child class

    if (!Model.instances.has(className)) {
      // If the instance does not exist, create a new one
      const instance = new this(); // 'this' refers to the calling child class
      Model.instances.set(className, instance);
    }

    // Return the instance of the child class
    return Model.instances.get(className) as T;
  }

  public static getState = (): ResourceProps => {
    throw new Error("All child classes must implement this method");
  };

  protected initialState?: ResourceProps;
  protected fillable: Array<string> = [];
  protected guarded: Array<string> = [];
  protected columns!: ModelColumnsProps[];
  public buttonConditions: ConditionalArray[] = [];
  public manageButtons: TableBttnProps[] = [
    {
      action: "update",
      label: "Manage",
      icon: "create",
      variant: "success",
      isDisabled: false,
      conditions: [],
      terms: "and",
    },
  ];

  public getPath = () => {
    return this.path;
  };

  static fromJson = (data: Partial<ResourceProps>): ResourceProps => {
    throw new Error("All child classes must implement this method");
  };
}
