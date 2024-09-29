import { Option } from "../../components/forms/SelectInput";
import { LoanTypeData } from "./LoanTypeModel";
import Model, {
  ModelColumnsProps,
  ResourceProps,
  TableBttnProps,
} from "./Model";

// export interface GuarantorShortData {
//   id: number;
//   staff_no: string;
//   name: string;
//   email?: string;
// }

export interface LoanData extends ResourceProps {
  user_id: number;
  loan_type_id: number;
  interest_rate_id: number;
  amount: string;
  approved_amount?: string;
  reason: string;
  tenor: number;
  frequency: "monthly" | "annually" | "custom";
  loanTypes?: LoanTypeData[];
  guarantors?: Option[];
  guarantors_count?: number;
}

export default class LoanModel extends Model {
  protected json!: LoanData;
  protected path: string = "/requests/loan-requests";

  protected fillable: Array<keyof LoanData> = [
    "loan_type_id",
    "interest_rate_id",
    "amount",
    "reason",
    "tenor",
    "frequency",
    "user_id",
  ];

  protected initialState: LoanData = {
    id: 0,
    user_id: 0,
    loan_type_id: 0,
    interest_rate_id: 0,
    amount: "",
    approved_amount: "",
    reason: "",
    tenor: 0,
    frequency: "monthly",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Code", accessor: "code" },
    { label: "Type", accessor: "type" },
    { label: "Amount", accessor: "currency" },
    { label: "Stage", accessor: "stage" },
    { label: "Status", accessor: "status" },
    { label: "Raised", accessor: "raised_at" },
  ];

  public manageButtons: TableBttnProps[] = [
    {
      action: "view",
      label: "View",
      icon: "eye",
      variant: "info",
      isDisabled: false,
      conditions: [],
      terms: "and",
    },
    {
      action: "update",
      label: "Manage",
      icon: "create",
      variant: "success",
      isDisabled: false,
      conditions: [["status", "!=", "pending"]],
      terms: "and",
    },
    {
      action: "guarantors",
      label: "Guarantors",
      icon: "people-circle",
      variant: "warning",
      isDisabled: false,
      conditions: [
        ["status", "!=", "pending"],
        ["guarantors_count", "=", 3],
      ],
      terms: "or",
    },
  ];

  public static getState = (): LoanData => {
    return this.init().initialState;
  };

  public static getFrequencies = (): Option[] => {
    return [
      { label: "Monthly", value: "monthly" },
      { label: "Annually", value: "annually" },
      { label: "Custom", value: "custom" },
    ];
  };

  static fromJson = (data: Partial<LoanData>): LoanData => {
    return {
      id: data.id || 0,
      loan_type_id: data.loan_type_id || 0,
      interest_rate_id: data.interest_rate_id || 0,
      tenor: data.tenor || 0,
      frequency: data.frequency || "monthly",
      user_id: data.user_id || 0,
      amount: data.amount || "",
      approved_amount: data.approved_amount || "",
      reason: data.reason || "",
    };
  };
}
