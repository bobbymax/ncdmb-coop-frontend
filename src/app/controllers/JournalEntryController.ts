import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class JournalEntryController extends Controller {
  public name: string = "JournalEntryController";
  public url: string = "journalEntries";
  protected associates: AssociatesProps[] = [
    {
      name: "journals",
      url: "journals",
    },
  ];
}
