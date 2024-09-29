import { Option } from "../../components/forms/SelectInput";
import { FundData } from "./FundModel";
import Model, {
  ModelColumnsProps,
  ResourceProps,
  TableBttnProps,
} from "./Model";

export interface ExpenditureData extends ResourceProps {
  user_id: number;
  fund_id: number;
  beneficiary: string;
  amount: string;
  beneficiary_id: number;
  mandate_id: number;
  loan_id: number;
  period: number;
  description: string;
  flag: "debit" | "credit";
  payment_type: "loan" | "project" | "contribution" | "other";
  type: "staff" | "member" | "third-party";
  reference?: string;
  available_balance?: number;
  new_balance?: number;
  created_at?: string;
  updated_at?: string;
  fund?: FundData;
}

export default class ExpenditureModel extends Model {
  protected json!: ExpenditureData;
  protected path: string = "/accounting/expenditures";

  protected fillable: Array<keyof ExpenditureData> = [
    "amount",
    "beneficiary",
    "beneficiary_id",
    "description",
    "flag",
    "fund_id",
    "loan_id",
    "mandate_id",
    "payment_type",
    "period",
    "type",
    "reference",
  ];

  protected initialState: ExpenditureData = {
    id: 0,
    user_id: 0,
    fund_id: 0,
    beneficiary: "",
    amount: "",
    beneficiary_id: 0,
    mandate_id: 0,
    loan_id: 0,
    period: 0,
    description: "",
    flag: "debit",
    payment_type: "loan",
    type: "staff",
    reference: "",
    available_balance: 0,
    new_balance: 0,
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Code", accessor: "code" },
    { label: "Beneficiary", accessor: "beneficiary" },
    { label: "Amount", accessor: "amount" },
    { label: "Purpose", accessor: "description" },
    { label: "Type", accessor: "flag" },
    { label: "Status", accessor: "status" },
  ];

  public manageButtons: TableBttnProps[] = [
    {
      action: "destroy",
      label: "Reverse",
      icon: "trash-bin",
      variant: "danger",
      isDisabled: false,
      conditions: [["status", "!=", "pending"]],
      terms: "and",
    },
  ];

  public static getState = (): ExpenditureData => {
    return this.init().initialState;
  };

  public static getFlags = (): Option[] => {
    return [
      { label: "Credit", value: "credit" },
      { label: "Debit", value: "debit" },
    ];
  };

  public static getPaymentTypes = (): Option[] => {
    return [
      { label: "Loan", value: "loan" },
      { label: "Project", value: "project" },
      { label: "Contribution", value: "contribution" },
      { label: "Other", value: "other" },
    ];
  };

  public static getTypes = (): Option[] => {
    return [
      { label: "Staff", value: "staff" },
      { label: "Member", value: "member" },
      { label: "Third Party", value: "third-party" },
    ];
  };

  static fromJson = (data: Partial<ExpenditureData>): ExpenditureData => {
    return {
      id: data.id || 0,
      loan_id: data.loan_id || 0,
      amount: data.amount || "",
      beneficiary: data.beneficiary || "",
      beneficiary_id: data.beneficiary_id || 0,
      description: data.description || "",
      flag: data.flag || "debit",
      fund_id: data.fund_id || 0,
      mandate_id: data.mandate_id || 0,
      payment_type: data.payment_type || "loan",
      period: data.period || 0,
      type: data.type || "staff",
      user_id: data.user_id || 0,
      reference: data.reference || "",
    };
  };
}
