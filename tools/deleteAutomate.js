// tools/deleteController.js
const fs = require("fs");
const path = require("path");

const name = process.argv[2];

if (!name) {
  console.error("Please provide a name to delete, e.g. npm run delete:controller spotify");
  process.exit(1);
}

const files = [
  path.join(__dirname, `../src/controllers/${name}Controller.js`),
  path.join(__dirname, `../src/services/${name}Service.js`),
  path.join(__dirname, `../src/routes/${name}.js`)
];

let deleted = 0;

for (const file of files) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Deleted ${file}`);
    deleted++;
  } else {
    console.warn(`Not found: ${file}`);
  }
}

if (deleted > 0) {
  console.log(`${deleted} file(s) deleted for "${name}" module.`);
} else {
  console.log("No files deleted — nothing found.");
}
