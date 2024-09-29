import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class InterestRateController extends Controller {
  public name: string = "InterestRateController";
  public url: string = "interestRates";

  protected associates: AssociatesProps[] = [
    {
      name: "loanTypes",
      url: "loanTypes",
    },
  ];
}
