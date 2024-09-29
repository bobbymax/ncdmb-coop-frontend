import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface AccountData extends ResourceProps {
  user_id: number;
  bank_name: string;
  account_number: string;
  sort_code?: string;
  default_account?: boolean;
}

export default class AccountModel extends Model {
  protected json!: AccountData;
  protected path: string = "/user/profile";

  protected fillable: Array<keyof AccountData> = [
    "account_number",
    "bank_name",
    "sort_code",
  ];

  protected initialState: AccountData = {
    id: 0,
    user_id: 0,
    bank_name: "",
    account_number: "",
    sort_code: "",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Bank", accessor: "bank_name" },
    { label: "Account Number", accessor: "account_number" },
  ];

  public static getState = (): AccountData => {
    return this.init().initialState;
  };

  static fromJson = (data: any): AccountData => {
    return {
      id: data.id || 0,
      user_id: data.user_id || 0,
      bank_name: data.bank_name || "",
      account_number: data.account_number || "",
      sort_code: data.sort_code || "",
    };
  };
}
