import Model, { ResourceProps } from "./Model";

export default class DashboardModel extends Model {
  protected path: string = "/accounting/funds";
  public static getState: () => ResourceProps;
}
