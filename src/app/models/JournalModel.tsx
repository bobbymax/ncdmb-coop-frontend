import { JournalEntryData } from "./JournalEntryModel";
import Model, {
  ModelColumnsProps,
  ResourceProps,
  TableBttnProps,
} from "./Model";

export interface JournalEntryLineData extends ResourceProps {
  journal_entry_id?: number;
  debit_chart_of_account_id: number;
  credit_chart_of_account_id: number;
  top_debit: string;
  top_credit: string;
  bottom_debit: string;
  bottom_credit: string;
}

export interface JournalData extends ResourceProps {
  title: string;
  description: string;
  reference?: string;
  journal_entries?: JournalEntryData[];
}

export default class JournalModel extends Model {
  protected json!: JournalData;
  public path: string = "/book-keeping/journals";

  protected fillable: Array<keyof JournalData> = ["title", "description"];

  protected initialState: JournalData = {
    id: 0,
    title: "",
    description: "",
    reference: "",
    journal_entries: [],
  };

  protected columns: ModelColumnsProps[] = [
    { label: "Title", accessor: "title" },
  ];

  public manageButtons: TableBttnProps[] = [
    {
      action: "update",
      label: "Manage",
      icon: "create",
      variant: "success",
      isDisabled: false,
      conditions: [],
      terms: "and",
    },
    {
      action: "external",
      label: "Post",
      icon: "send",
      variant: "info",
      isDisabled: false,
      conditions: [],
      terms: "and",
    },
  ];

  public static getState = (): JournalData => {
    return this.init().initialState;
  };

  static fromJson = (data: any): JournalData => {
    return {
      id: data.id || 0,
      title: data.title || "",
      description: data.description || "",
      journal_entries: data.journal_entries || [],
    };
  };
}
