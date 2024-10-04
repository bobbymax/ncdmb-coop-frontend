import Model, { ResourceProps } from "./Model";

export interface ImportData extends ResourceProps {
  file: string;
  resource: "members" | "contributions" | "groups" | "expenditures" | "plans";
}

export default class ImportModel extends Model {
  protected json!: ImportData;
  public path: string = "/admin-center/imports";

  protected fillable: Array<keyof ImportData> = ["file", "resource"];

  protected initialState: ImportData = {
    id: 0,
    file: "",
    resource: "members",
  };

  public static getState = (): ImportData => {
    return this.init().initialState;
  };
}
