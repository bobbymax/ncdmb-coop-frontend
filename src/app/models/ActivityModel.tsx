import { Option } from "../../components/forms/SelectInput";
import Model, { ModelColumnsProps, ResourceProps } from "./Model";
import { PlanData } from "./PlanModel";

export interface ActivityData extends ResourceProps {
  plan_id: number;
  code: string;
  name: string;
  type: "project" | "loan" | "other";
  plans?: PlanData[] | Option[];
}

interface ActivityTypeProps {
  value: "project" | "loan" | "other";
  label: string;
}

export default class ActivityModel extends Model {
  protected json!: ActivityData;
  protected path: string = "/accounting/activities";

  protected fillable: Array<keyof ActivityData> = [
    "code",
    "plan_id",
    "name",
    "type",
  ];

  protected initialState: ActivityData = {
    id: 0,
    plan_id: 0,
    code: "",
    name: "",
    type: "project",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Code", accessor: "code" },
    { label: "Name", accessor: "name" },
    { label: "Type", accessor: "type" },
  ];

  activityTypes: ActivityTypeProps[] = [
    { label: "Project", value: "project" },
    { label: "Loan", value: "loan" },
    { label: "Other", value: "other" },
  ];

  public static getState = (): ActivityData => {
    return this.init().initialState;
  };

  public static getActivityTypes = (): ActivityTypeProps[] => {
    return this.init().activityTypes;
  };

  static fromJson = (data: Partial<ActivityData>): ActivityData => {
    return {
      id: data.id || 0,
      name: data.name || "",
      type: data.type as "project" | "loan" | "other",
      code: data.code || "",
      plan_id: data.plan_id || 0,
    };
  };
}
