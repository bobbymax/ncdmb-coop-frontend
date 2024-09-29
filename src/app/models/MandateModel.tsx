import { ExpenditureData } from "./ExpenditureModel";
import Model, {
  ModelColumnsProps,
  ResourceProps,
  TableBttnProps,
} from "./Model";

export interface MandateData extends ResourceProps {
  fund_id: number;
  beneficiary?: string;
  no_of_payments: number;
  description?: string;
  total_amount: string;
  period: number;
  expenditures?: ExpenditureData[];
}

export default class MandateModel extends Model {
  protected json!: MandateData;
  protected path: string = "/accounting/mandates";

  protected fillable: Array<keyof MandateData> = [
    "fund_id",
    "beneficiary",
    "no_of_payments",
    "description",
    "total_amount",
  ];

  protected initialState: MandateData = {
    id: 0,
    fund_id: 0,
    beneficiary: "",
    no_of_payments: 0,
    description: "",
    total_amount: "",
    period: 0,
    expenditures: [],
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Code", accessor: "code" },
    { label: "No. of Payments", accessor: "no_of_payments" },
    { label: "Amount", accessor: "total_amount" },
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
    {
      action: "print",
      label: "Print",
      icon: "print",
      variant: "warning",
      isDisabled: false,
      conditions: [],
      terms: "and",
    },
  ];

  public static getState = (): MandateData => {
    return this.init().initialState;
  };

  static fromJson = (data: Partial<MandateData>): MandateData => {
    return {
      id: data.id || 0,
      fund_id: data.fund_id || 0,
      beneficiary: data.beneficiary || "",
      no_of_payments: data.no_of_payments || 0,
      description: data.description || "",
      total_amount: data.total_amount || "",
      period: data.period || 0,
      expenditures: data.expenditures || [],
    };
  };
}
