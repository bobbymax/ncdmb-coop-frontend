import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class ExpenditureController extends Controller {
  public name: string = "ExpenditureController";
  public url: string = "expenditures";

  protected associates: AssociatesProps[] = [
    {
      name: "funds",
      url: "funds",
    },
    {
      name: "members",
      url: "members",
    },
  ];
}
