import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface AccountTypeData extends ResourceProps {
  name: string;
  label?: string;
}

export default class AccountTypeModel extends Model {
  protected json!: AccountTypeData;
  protected path: string = "/secretariat/account-types";

  protected fillable: Array<keyof AccountTypeData> = ["name"];

  protected initialState: AccountTypeData = {
    id: 0,
    name: "",
  };

  public static getState = (): AccountTypeData => {
    return this.init().initialState;
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Name", accessor: "name" },
  ];

  static fromJson = (data: Partial<AccountTypeData>): AccountTypeData => {
    return {
      id: data.id ?? 0,
      name: data.name || "",
    };
  };
}
