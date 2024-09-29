import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class MandateController extends Controller {
  public name: string = "MandateController";
  public url: string = "mandates";

  protected associates: AssociatesProps[] = [
    {
      name: "expenditures",
      url: "pending/expenditures",
    },
  ];
}
