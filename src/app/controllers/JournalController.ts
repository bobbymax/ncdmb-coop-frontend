import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class JournalController extends Controller {
  public name: string = "JournalController";
  public url: string = "journals";
  protected associates: AssociatesProps[] = [
    {
      name: "chartOfAccounts",
      url: "chartOfAccounts",
    },
  ];
}
