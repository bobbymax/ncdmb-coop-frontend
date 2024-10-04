import { Option } from "../../components/forms/SelectInput";
import { ActivityData } from "./ActivityModel";
import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface FundData extends ResourceProps {
  activity_id: number;
  approved_amount: number;
  period: number;
  activities?: ActivityData[] | Option[];
  commitment?: string;
  booked_balance?: number;
  actual_balance?: string;
  spent?: string;
  reserved?: string;
  activity?: string;
}

export default class FundModel extends Model {
  protected json!: FundData;
  public path: string = "/accounting/funds";

  protected fillable: Array<keyof FundData> = [
    "activity_id",
    "approved_amount",
    "period",
  ];

  protected initialState: FundData = {
    id: 0,
    activity_id: 0,
    approved_amount: 0,
    period: 0,
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Activity", accessor: "activity" },
    { label: "Amount", accessor: "approved_amount" },
    { label: "Spent", accessor: "spent" },
  ];

  public static getState = (): FundData => {
    return this.init().initialState;
  };

  static fromJson = (data: Partial<FundData>): FundData => {
    return {
      id: data.id || 0,
      activity_id: data.activity_id || 0,
      approved_amount: data.approved_amount || 0,
      period: data.period || 0,
    };
  };
}
