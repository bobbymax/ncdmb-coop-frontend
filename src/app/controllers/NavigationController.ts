import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class NavigationController extends Controller {
  public name: string = "NavigationController";
  public url: string = "navigations";

  protected associates: AssociatesProps[] = [
    {
      name: "groups",
      url: "groups",
    },
  ];
}
