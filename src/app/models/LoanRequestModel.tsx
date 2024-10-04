import moment from "moment";
import { Option } from "../../components/forms/SelectInput";
import { LoanData } from "./LoanModel";
import Model, { ModelColumnsProps, TableBttnProps } from "./Model";

export interface LoanRequestData extends LoanData {
  status: "registered" | "approved" | "rejected";
  start_repayment_date: string;
  disbursed?: boolean;
  remarks: string;
}

export default class LoanRequestModel extends Model {
  protected json!: LoanData;
  public path: string = "/secretariat/loans";

  protected fillable: Array<keyof LoanRequestData> = [
    "loan_type_id",
    "interest_rate_id",
    "amount",
    "reason",
    "tenor",
    "frequency",
    "user_id",
    "status",
    "start_repayment_date",
  ];

  protected initialState: LoanRequestData = {
    id: 0,
    user_id: 0,
    loan_type_id: 0,
    interest_rate_id: 0,
    amount: "",
    approved_amount: "",
    reason: "",
    tenor: 0,
    frequency: "monthly",
    status: "registered",
    start_repayment_date: "",
    remarks: "",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Code", accessor: "code" },
    { label: "Member", accessor: "member" },
    { label: "Type", accessor: "type" },
    { label: "Amount", accessor: "currency" },
    { label: "Raised", accessor: "raised_at" },
  ];

  public manageButtons: TableBttnProps[] = [
    {
      action: "update",
      label: "Manage",
      icon: "create",
      variant: "success",
      isDisabled: false,
      conditions: [["status", "!=", "registered"]],
      terms: "and",
    },
    // {
    //   action: "view",
    //   label: "View",
    //   icon: "eye",
    //   variant: "info",
    //   isDisabled: false,
    //   conditions: [],
    //   terms: "and",
    // },
    {
      action: "schedule",
      label: "Schedule",
      icon: "calendar",
      variant: "warning",
      isDisabled: false,
      conditions: [
        ["status", "!=", "approved"],
        ["stage", "=", "posting"],
      ],
      terms: "or",
    },
  ];

  public static getState = (): LoanRequestData => {
    return this.init().initialState;
  };

  public static getActions = (): Option[] => {
    return [
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
    ];
  };

  public static getFrequencies = (): Option[] => {
    return [
      { label: "Monthly", value: "monthly" },
      { label: "Annually", value: "annually" },
      { label: "Custom", value: "custom" },
    ];
  };

  static fromJson = (data: Partial<LoanRequestData>): LoanRequestData => {
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
      status: data.status || "registered",
      start_repayment_date:
        moment(data.start_repayment_date).format("YYYY-MM-DD") || "",
      remarks: data.remarks || "",
    };
  };
}
