// providers/Provider.js
class Provider {
  constructor() {
    this.bindings = {};

    // Proxy to dynamically handle model and service getters
    this.models = new Proxy(
      {},
      {
        get: (target, prop) => {
          if (!this.bindings[prop]) {
            throw new Error(`Model '${prop}' is not registered in Provider.`);
          }
          return this.bindings[prop].model;
        },
      }
    );

    this.services = new Proxy(
      {},
      {
        get: (target, prop) => {
          if (!this.bindings[prop]) {
            throw new Error(`Service '${prop}' is not registered in Provider.`);
          }
          return this.bindings[prop].service;
        },
      }
    );
  }

  bind(name, ModelClass, ServiceClass) {
    this.bindings[name] = {
      model: new ModelClass(),
      service: new ServiceClass(),
    };
  }

  // Methods to dynamically access model or service
  model(name) {
    return this.models[name];
  }

  service(name) {
    return this.services[name];
  }
}

const Provide = new Provider();

export default Provide;
