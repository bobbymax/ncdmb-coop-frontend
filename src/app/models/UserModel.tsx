import { Option } from "../../components/forms/SelectInput";
import Model, { ModelColumnsProps, ResourceProps } from "./Model";

export interface GroupProps extends ResourceProps {
  name: string;
  label: string;
  max_slots: number;
}

interface ContributionProps extends ResourceProps {
  month: Date;
  amount: number;
  is_current: boolean;
}

interface WalletProps extends ResourceProps {
  available_balance: number;
  ledger_balance: number;
  contribution: number;
  deposits: number;
  is_locked: boolean;
}

export interface MemberTypeProps {
  value: "staff" | "admin" | "member" | "support";
  label: string;
}

export interface UserData extends ResourceProps {
  firstname: string;
  middlename?: string;
  surname: string;
  email: string;
  contribution?: ContributionProps;
  groups?: Option[] | GroupProps[];
  wallet?: Partial<WalletProps>;
  contributions?: ContributionProps[];
  fee?: number;
  type: "member" | "staff" | "support" | "admin";
  bank_name?: string;
  account_number?: string;
  membership_no: string;
}

export default class UserModel extends Model {
  protected json!: UserData;
  protected path: string = "/secretariat/members";

  protected fillable: Array<keyof UserData> = [
    "firstname",
    "middlename",
    "surname",
    "email",
    "contribution",
  ];

  protected initialState: UserData = {
    id: 0,
    firstname: "",
    middlename: "",
    surname: "",
    email: "",
    type: "member",
    fee: 0,
    groups: [],
    account_number: "",
    bank_name: "",
    membership_no: "",
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Firstname", accessor: "firstname" },
    { label: "Surname", accessor: "surname" },
    { label: "Membership ID", accessor: "membership_no" },
    { label: "Email", accessor: "email" },
    { label: "Contribution", accessor: "fee" },
  ];

  memberTypes: MemberTypeProps[] = [
    { label: "Staff", value: "staff" },
    { label: "Member", value: "member" },
    { label: "Support", value: "support" },
    { label: "Admin", value: "admin" },
  ];

  public static getState = (): UserData => {
    return this.init().initialState;
  };

  static fromJson = (data: any): UserData => {
    return {
      id: data.id || 0,
      firstname: data.firstname || "",
      middlename: data.middlename || "",
      surname: data.surname || "",
      email: data.email || "",
      type: data.type || "member",
      fee: data.wallet?.contribution || 0,
      groups: data.groups || [],
      bank_name: data.account?.bank_name || "",
      account_number: data.account?.account_number || "",
      membership_no: data.membership_no || "",
    };
  };
}
