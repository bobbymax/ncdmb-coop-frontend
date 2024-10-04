import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface LoanOfferData extends ResourceProps {
  interestRate: number;
  loanAmount: number;
  tenor: number;
  commitment: number;
  frequency: "monthly" | "annually";
  type: string;
  deduction: number;
  base_iterable_amount: "requested" | "total" | "reduced";
  total_recieveable_amount: "all" | "deducted";
  available_balance: number;
  member_name: string;
  max_requestable_amount: number;
  start_month: string;
}

export default class LoanOfferModel extends Model {
  protected json!: LoanOfferData;
  public path: string = "/secretariat/loans/:id/schedule";

  protected fillable: Array<keyof LoanOfferData> = [
    "interestRate",
    "loanAmount",
    "tenor",
    "commitment",
    "frequency",
    "type",
    "deduction",
    "base_iterable_amount",
    "total_recieveable_amount",
    "available_balance",
    "member_name",
    "max_requestable_amount",
    "start_month",
  ];

  protected initialState: LoanOfferData = {
    id: 0,
    interestRate: 0,
    loanAmount: 0,
    tenor: 0,
    commitment: 0,
    frequency: "monthly",
    type: "",
    deduction: 0,
    base_iterable_amount: "requested",
    total_recieveable_amount: "all",
    available_balance: 0,
    member_name: "",
    max_requestable_amount: 0,
    start_month: "",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Repayment Date", accessor: "repayment_date" },
    { label: "Installment", accessor: "amount" },
    { label: "Balance", accessor: "balance" },
  ];

  public static getState = (): LoanOfferData => {
    return this.init().initialState;
  };

  static fromJson = (data: Partial<LoanOfferData>): LoanOfferData => {
    return {
      id: data.id || 0,
      interestRate: data.interestRate || 0,
      loanAmount: data.loanAmount || 0,
      tenor: data.tenor || 0,
      commitment: data.commitment || 0,
      frequency: data.frequency || "monthly",
      type: data.type || "",
      deduction: data.deduction || 0,
      base_iterable_amount: data.base_iterable_amount || "requested",
      total_recieveable_amount: data.total_recieveable_amount || "all",
      available_balance: data.available_balance || 0,
      member_name: data.member_name || "",
      max_requestable_amount: data.max_requestable_amount || 0,
      start_month: data.start_month || "",
    };
  };
}
