import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class LoanRequestController extends Controller {
  public name: string = "LoanRequestController";
  public url: string = "registered/loans";

  protected associates: AssociatesProps[] = [
    {
      name: "loanTypes",
      url: "loanTypes",
    },
    {
      name: "members",
      url: "members",
    },
  ];
}
