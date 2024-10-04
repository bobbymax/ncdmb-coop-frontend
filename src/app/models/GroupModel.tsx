import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface GroupData extends ResourceProps {
  name: string;
  label: string;
  max_slots: number;
}

export default class GroupModel extends Model {
  protected json!: GroupData;
  public path: string = "/admin-center/groups";

  protected fillable: Array<keyof GroupData> = ["name", "max_slots"];

  protected initialState: GroupData = {
    id: 0,
    name: "",
    label: "",
    max_slots: 0,
  };

  public static getState = (): GroupData => {
    return this.init().initialState;
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Name", accessor: "name" },
    { label: "Slots", accessor: "max_slots" },
  ];

  static fromJson = (data: Partial<GroupData>): GroupData => {
    return {
      id: data.id ?? 0,
      name: data.name || "",
      label: data.label || "",
      max_slots: data.max_slots ?? 0,
    };
  };
}
