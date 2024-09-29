import { Option } from "../../components/forms/SelectInput";
import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface InterestRateData extends ResourceProps {
  loan_type_id: number;
  tenor: number;
  rate: string;
  deduction: string;
  base_iterable_amount: "requested" | "total" | "reduced";
  total_recieveable_amount: "all" | "deducted";
}

export default class InterestRateModel extends Model {
  protected json!: InterestRateData;
  protected path: string = "/secretariat/interest-rates";

  protected fillable: Array<keyof InterestRateData> = [
    "loan_type_id",
    "tenor",
    "rate",
    "deduction",
    "base_iterable_amount",
    "total_recieveable_amount",
  ];

  protected initialState: InterestRateData = {
    id: 0,
    loan_type_id: 0,
    tenor: 0,
    rate: "",
    deduction: "",
    base_iterable_amount: "requested",
    total_recieveable_amount: "all",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Tenor", accessor: "tenor" },
    { label: "Interest Rate", accessor: "rate" },
    { label: "Deduction", accessor: "deduction" },
    { label: "Principal", accessor: "base_iterable_amount" },
    { label: "Recieveable", accessor: "total_recieveable_amount" },
  ];

  public static getState = (): InterestRateData => {
    return this.init().initialState;
  };

  public static getPrincipal = (): Option[] => {
    return [
      { value: "requested", label: "Requested" },
      { value: "total", label: "Total" },
      { value: "reduced", label: "Reduced" },
    ];
  };

  public static getRecieveable = (): Option[] => {
    return [
      { value: "all", label: "All" },
      { value: "deducted", label: "Deducted" },
    ];
  };

  static fromJson = (data: Partial<InterestRateData>): InterestRateData => {
    return {
      id: data.id || 0,
      loan_type_id: data.loan_type_id || 0,
      tenor: data.tenor || 0,
      rate: data.rate || "",
      deduction: data.deduction || "",
      base_iterable_amount: data.base_iterable_amount || "requested",
      total_recieveable_amount: data.total_recieveable_amount || "all",
    };
  };
}
