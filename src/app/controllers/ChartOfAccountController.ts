import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class ChartOfAccountController extends Controller {
  public name: string = "ChartOfAccountController";
  public url: string = "chartOfAccounts";
  protected associates: AssociatesProps[] = [
    {
      name: "accountTypes",
      url: "accountTypes",
    },
  ];
}
