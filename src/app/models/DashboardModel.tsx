import Model, { ResourceProps } from "./Model";

export default class DashboardModel extends Model {
  public path: string = "/accounting/funds";
  public static getState: () => ResourceProps;
}
