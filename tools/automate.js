const fs = require("fs");
const path = require("path");

const name = process.argv[2];
if (!name) {
  console.error("Please provide a controller name.");
  process.exit(1);
}

const controllerName = `${name}Controller.js`;
const serviceName = `${name}Service.js`;
const routeName = `${name}.js`;

const controllerTemplate = `
const ${name}Service = require("../services/${serviceName.replace(".js", "")}");

exports.example = async (req, res, next) => {
  try {
    const data = await ${name}Service.example();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
`;

const serviceTemplate = `
exports.example = async () => {
  return { message: "Service for ${name}" };
};
`;

const routeTemplate = `
const express = require("express");
const router = express.Router();
const ${name}Controller = require("../controllers/${controllerName.replace(".js", "")}");

router.get("/", ${name}Controller.example);

module.exports = router;
`;

fs.writeFileSync(path.join(__dirname, "../src/controllers", controllerName), controllerTemplate);
fs.writeFileSync(path.join(__dirname, "../src/services", serviceName), serviceTemplate);
fs.writeFileSync(path.join(__dirname, "../src/routes", routeName), routeTemplate);

console.log(`Created controller, service, and route for ${name}`);
