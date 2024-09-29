import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class LoanTypeController extends Controller {
  public name: string = "LoanTypeController";
  public url: string = "loanTypes";

  protected associates: AssociatesProps[] = [
    {
      name: "activities",
      url: "activities",
    },
  ];
}
