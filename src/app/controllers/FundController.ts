import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class FundController extends Controller {
  public name: string = "FundController";
  public url: string = "funds";

  protected associates: AssociatesProps[] = [
    {
      name: "activities",
      url: "activities",
    },
  ];
}
