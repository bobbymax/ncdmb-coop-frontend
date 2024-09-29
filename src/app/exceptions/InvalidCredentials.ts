export default class InvalidCredentials extends Error {
  constructor(resourceName: string, message: string) {
    super(message);
    this.name = "InvalidCredentials";
    this.message = message;

    Object.setPrototypeOf(this, InvalidCredentials.prototype);
  }
}
