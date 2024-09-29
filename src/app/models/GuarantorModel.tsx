import { Option } from "../../components/forms/SelectInput";
import Model, {
  ModelColumnsProps,
  ResourceProps,
  TableBttnProps,
} from "./Model";

export interface GuarantorData extends ResourceProps {
  user_id: number;
  loan_id: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

export default class GuarantorModel extends Model {
  protected json!: GuarantorData;
  protected path: string = "/requests/commitments";

  protected fillable: Array<keyof GuarantorData> = [
    "loan_id",
    "reason",
    "status",
  ];

  protected initialState: GuarantorData = {
    id: 0,
    user_id: 0,
    loan_id: 0,
    reason: "",
    status: "pending",
  };

  public static getState = (): GuarantorData => {
    return this.init().initialState;
  };

  public static getActions = (): Option[] => {
    return [
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
    ];
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Owner", accessor: "owner" },
    { label: "Type", accessor: "loan_type" },
    { label: "Amount", accessor: "currency" },
    { label: "Applied", accessor: "raised_at" },
    { label: "Status", accessor: "status" },
  ];

  public manageButtons: TableBttnProps[] = [
    {
      action: "update",
      label: "Manage",
      icon: "create",
      variant: "success",
      isDisabled: false,
      conditions: [["status", "=", "approved"]],
      terms: "and",
    },
  ];

  static fromJson = (data: Partial<GuarantorData>): GuarantorData => {
    return {
      id: data.id ?? 0,
      user_id: data.user_id ?? 0,
      loan_id: data.loan_id ?? 0,
      reason: data.reason || "",
      status: data.status || "pending",
    };
  };
}
