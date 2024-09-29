import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface PlanData extends ResourceProps {
  name: string;
}

export default class PlanModel extends Model {
  protected json!: PlanData;
  protected path = "/accounting/plans";

  protected fillable: Array<keyof PlanData> = ["name"];

  protected initialState: PlanData = {
    id: 0,
    name: "",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Code", accessor: "code" },
    { label: "Name", accessor: "name" },
  ];

  public static getState = (): PlanData => {
    return this.init().initialState;
  };

  static fromJson = (data: any): PlanData => {
    return {
      id: data.id || 0,
      name: data.name || "",
    };
  };
}
