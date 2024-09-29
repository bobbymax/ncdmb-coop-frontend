export default abstract class ServiceProvider {
  protected model: any;
  protected service: any;

  protected parent: any;

  constructor(Model: any, Service: any) {
    this.model = Model;
    this.service = Service;
  }

  bind = () => {
    this.parent = {
      model: this.model,
      service: this.service,
    };
  };

  provide = () => [
    //
  ];

  abstract init(model: any, serviceClass: any): any;
}
