import { AssociatesProps } from "../models/Model";
import Controller from "./Controller";

export default class UserController extends Controller {
  public name: string = "UserController";
  public url: string = "members";
  protected associates: AssociatesProps[] = [
    {
      name: "groups",
      url: "groups",
    },
  ];
}
