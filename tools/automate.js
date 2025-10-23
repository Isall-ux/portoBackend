const fs = require("fs");
const path = require("path");

// Get arguments
const name = process.argv[2];
const type = process.argv[3]; // optional: "controller", "service", "route", or "all"

if (!name) {
  console.error("Please provide a name.");
  process.exit(1);
}

// Determine what to create
const createController = !type || type === "controller" || type === "all";
const createService = !type || type === "service" || type === "all";
const createRoute = !type || type === "route" || type === "all";

// Filenames
const controllerName = `${name}Controller.js`;
const serviceName = `${name}Service.js`;
const routeName = `${name}.js`;

// Templates
const controllerTemplate = `
${createService ? `const ${name}Service = require("../services/${serviceName.replace(".js","")}");` : ""}

exports.example = async (req, res, next) => {
  try {
    ${createService ? `const data = await ${name}Service.example();` : "const data = { message: 'No service available' };"}
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
${createController ? `const ${name}Controller = require("../controllers/${controllerName.replace(".js","")}");` : ""}

router.get("/", ${createController ? `${name}Controller.example` : "(req, res) => res.json({ message: 'No controller' })"});

module.exports = router;
`;

// Write files
if (createController) {
  fs.writeFileSync(path.join(__dirname, "../src/controllers", controllerName), controllerTemplate.trim());
  console.log(`Created controller: ${controllerName}`);
}

if (createService) {
  fs.writeFileSync(path.join(__dirname, "../src/services", serviceName), serviceTemplate.trim());
  console.log(`Created service: ${serviceName}`);
}

if (createRoute) {
  fs.writeFileSync(path.join(__dirname, "../src/routes", routeName), routeTemplate.trim());
  console.log(`Created route: ${routeName}`);
}