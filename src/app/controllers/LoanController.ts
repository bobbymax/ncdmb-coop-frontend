import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class LoanController extends Controller {
  public name: string = "LoanController";
  public url: string = "loans";

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
