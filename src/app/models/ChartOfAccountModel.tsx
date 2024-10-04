import { AccountTypeData } from "./AccountTypeModel";
import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface ChartOfAccountData extends ResourceProps {
  account_type_id: number;
  account_code: string;
  account_name: string;
  parent_account_id: number;
  account_type?: AccountTypeData;
}

export default class ChartOfAccountModel extends Model {
  protected json!: ChartOfAccountData;
  public path: string = "/secretariat/chart-of-accounts";

  protected fillable: Array<keyof ChartOfAccountData> = [
    "account_type_id",
    "account_code",
    "account_name",
    "parent_account_id",
  ];

  protected initialState: ChartOfAccountData = {
    id: 0,
    account_type_id: 0,
    account_code: "",
    account_name: "",
    parent_account_id: 0,
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Account Code", accessor: "account_code" },
    { label: "Name", accessor: "account_name" },
  ];

  public static getState = (): ChartOfAccountData => {
    return this.init().initialState;
  };

  static fromJson = (data: any): ChartOfAccountData => {
    return {
      id: data.id || 0,
      account_type_id: data.account_type_id || 0,
      account_code: data.account_code || "",
      account_name: data.account_name || "",
      parent_account_id: data.parent_account_id || 0,
    };
  };
}
