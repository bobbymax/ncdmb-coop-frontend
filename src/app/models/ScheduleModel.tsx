import { LoanData } from "./LoanModel";
import Model, {
  ModelColumnsProps,
  ResourceProps,
  TableBttnProps,
} from "./Model";

export interface ScheduleData extends ResourceProps {
  loan_id: number;
  amount: number;
  repayment_date: string;
  status: "pending" | "paid" | "overdue";
  loan?: LoanData;
}

export default class ScheduleModel extends Model {
  protected json!: ScheduleData;
  protected path: string = "/secretariat/schedules";

  protected fillable: Array<keyof ScheduleData> = [
    "loan_id",
    "amount",
    "repayment_date",
    "status",
  ];

  protected initialState: ScheduleData = {
    id: 0,
    loan_id: 0,
    amount: 0,
    repayment_date: "",
    status: "pending",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Repayment Date", accessor: "repayment_date" },
    { label: "Amount", accessor: "amount" },
    { label: "Status", accessor: "status" },
  ];

  public manageButtons: TableBttnProps[] = [
    {
      action: "external",
      label: "Clear",
      icon: "send",
      variant: "danger",
      isDisabled: false,
      conditions: [["status", "=", "paid"]],
      terms: "and",
    },
  ];

  public static getState = (): ScheduleData => {
    return this.init().initialState;
  };

  static fromJson = (data: Partial<ScheduleData>): ScheduleData => {
    return {
      id: data.id || 0,
      loan_id: data.loan_id || 0,
      amount: data.amount || 0,
      repayment_date: data.repayment_date || "",
      status: data.status || "pending",
    };
  };
}
