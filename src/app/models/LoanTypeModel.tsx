import { Option } from "../../components/forms/SelectInput";
import { ActivityData } from "./ActivityModel";
import { InterestRateData } from "./InterestRateModel";
import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface LoanTypeData extends ResourceProps {
  activity_id: number;
  name: string;
  max_requestable_amount: string;
  commitment: string;
  max_tenor: number;
  frequency: "monthly" | "annually" | "custom";
  type: "single" | "compound";
  activities?: ActivityData[] | Option[];
  interest_rates?: InterestRateData[];
}

export default class LoanTypeModel extends Model {
  protected json!: LoanTypeData;
  protected path: string = "/secretariat/loan-types";

  protected fillable: Array<keyof LoanTypeData> = [
    "activity_id",
    "name",
    "commitment",
    "frequency",
    "max_requestable_amount",
    "max_tenor",
  ];

  protected initialState: LoanTypeData = {
    id: 0,
    activity_id: 0,
    name: "",
    commitment: "",
    max_requestable_amount: "",
    max_tenor: 0,
    frequency: "monthly",
    type: "single",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Name", accessor: "name" },
    { label: "Max", accessor: "max_requestable_amount" },
    { label: "Frequency", accessor: "frequency" },
  ];

  public static getState = (): LoanTypeData => {
    return this.init().initialState;
  };

  public static getFrequencies = (): Option[] => {
    return [
      { value: "monthly", label: "Monthly" },
      { value: "annually", label: "Annually" },
      { value: "custom", label: "Custom" },
    ];
  };

  public static getTypes = (): Option[] => {
    return [
      { value: "single", label: "Single" },
      { value: "compound", label: "Compound" },
    ];
  };

  static fromJson = (data: Partial<LoanTypeData>): LoanTypeData => {
    return {
      id: data.id || 0,
      activity_id: data.activity_id || 0,
      name: data.name || "",
      commitment: data.commitment || "",
      max_requestable_amount: data.max_requestable_amount || "",
      max_tenor: data.max_tenor || 0,
      frequency: data.frequency || "monthly",
      type: data.type || "single",
      interest_rates: data.interest_rates || [],
    };
  };
}
