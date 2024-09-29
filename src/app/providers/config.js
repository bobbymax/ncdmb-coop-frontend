// providers/ProviderConfig.js
import Provide from "./Provider";

// Automatically require all models and services (both .js and .ts files)
export const modelsContext = require.context("../models", true, /\.(js|ts)$/);
const servicesContext = require.context("../services", true, /\.(js|ts)$/);

const isAbstractClass = (Class) => {
  return Class.prototype.constructor.name.endsWith("Abstract");
};

console.log(modelsContext);

modelsContext.keys().forEach((fileName) => {
  const modelName = fileName.replace(/(\.\/|\.js|\.ts)/g, ""); // Adjusted regex to remove both .js and .ts extensions
  const ModelClass = modelsContext(fileName).default;

  if (isAbstractClass(ModelClass)) {
    console.log(`Skipping abstract model: ${modelName}`);
    return;
  }

  // Find the corresponding Service Class by name
  const serviceFileName = servicesContext
    .keys()
    .find((serviceFile) => serviceFile.includes(modelName));

  const ServiceClass = serviceFileName
    ? servicesContext(serviceFileName).default
    : null;

  // Register the Model and Service in the Provider
  if (ServiceClass) {
    // Optionally check if ServiceClass is abstract here as well
    if (isAbstractClass(ServiceClass)) {
      console.warn(`Skipping abstract service class: ${modelName}`);
      return;
    }

    Provide.bind(modelName, ModelClass, ServiceClass);
  }
});

export default Provide;
