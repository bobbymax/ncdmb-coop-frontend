import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class ModuleController extends Controller {
  public name: string = "ModuleController";
  public url: string = "modules";

  protected associates: AssociatesProps[] = [
    {
      name: "groups",
      url: "groups",
    },
  ];
}
