export default class ResourceHandler extends Error {
  constructor(resourceName: string, message: string) {
    super(message);
    this.name = "ResourceHandler";
    this.message = message;

    Object.setPrototypeOf(this, ResourceHandler.prototype);
  }
}
