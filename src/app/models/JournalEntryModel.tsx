import { JournalEntryLineData } from "./JournalModel";
import Model, {
  ModelColumnsProps,
  ResourceProps,
  TableBttnProps,
} from "./Model";

export interface JournalEntryData extends ResourceProps {
  journal_id?: number;
  expenditure_id: number;
  entry_date: string;
  description: string;
  journal_entry_lines?: JournalEntryLineData[];
}

export default class JournalEntryModel extends Model {
  protected json!: JournalEntryData;
  public path: string = "/book-keeping/journal-entries";

  protected fillable: Array<keyof JournalEntryData> = [
    "description",
    "entry_date",
    "journal_id",
  ];

  protected initialState: JournalEntryData = {
    id: 0,
    journal_id: 0,
    expenditure_id: 0,
    entry_date: "",
    description: "",
  };

  public manageButtons: TableBttnProps[] = [
    {
      action: "external",
      label: "View",
      icon: "eye",
      variant: "info",
      isDisabled: false,
      conditions: [],
      terms: "and",
    },
  ];

  protected columns: ModelColumnsProps[] = [
    { label: "Entry Date", accessor: "entry_date" },
    { label: "Description", accessor: "description" },
  ];

  public static getState = (): JournalEntryData => {
    return this.init().initialState;
  };

  static fromJson = (data: any): JournalEntryData => {
    return {
      id: data.id || 0,
      description: data.description || "",
      entry_date: data.entry_date || "",
      expenditure_id: data.expenditure_id || 0,
      journal_id: data.journal_id || 0,
    };
  };
}
