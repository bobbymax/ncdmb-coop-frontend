import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class ActivityController extends Controller {
  public name: string = "ActivityController";
  public url: string = "activities";

  protected associates: AssociatesProps[] = [
    {
      name: "plans",
      url: "plans",
    },
  ];
}
