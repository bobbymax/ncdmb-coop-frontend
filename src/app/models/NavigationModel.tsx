import { Option } from "../../components/forms/SelectInput";
import Model, { ModelColumnsProps } from "./Model";
import { ModuleData, ModuleTypeProps } from "./ModuleModel";

export default class NavigationModel extends Model {
  protected json!: ModuleData;
  protected path: string = "/administration/navigation";

  protected fillable: Array<keyof ModuleData> = [
    "name",
    "parent_id",
    "type",
    "groups",
    "icon",
    "path",
  ];

  protected initialState: ModuleData = {
    id: 0,
    name: "",
    parent_id: 0,
    type: "application",
    groups: [],
    icon: "",
    path: "",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Name", accessor: "name" },
    { label: "Path", accessor: "path" },
    { label: "Type", accessor: "type" },
    { label: "Icon", accessor: "icon" },
  ];

  moduleTypes: ModuleTypeProps[] = [
    { label: "Application", value: "application" },
    { label: "Module", value: "module" },
    { label: "Page", value: "page" },
  ];

  static parentModules = (collection: ModuleData[]): Option[] => {
    const dropdown: Option[] = [{ value: 0, label: "None" }];
    collection.forEach((item) => {
      if (item.type === "application") {
        dropdown.push({
          value: item.id,
          label: item.name,
        });
      }
    });
    return dropdown;
  };

  public static getState = (): ModuleData => {
    return this.init().initialState;
  };

  public static getModuleTypes = (): ModuleTypeProps[] => {
    return this.init().moduleTypes;
  };

  static fromJson = (data: Partial<ModuleData>): ModuleData => {
    return {
      id: data.id || 0,
      name: data.name || "",
      parent_id: data.parent_id ?? 0,
      type: data.type as "application" | "module" | "page",
      groups: data.groups || [],
      icon: data.icon || "",
      path: data.path || "",
    };
  };
}
