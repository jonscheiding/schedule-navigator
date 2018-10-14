const path = require('path');
const fs = require('fs');
const randomColor = require('randomcolor');

const events = require('./events.json');

const colorsFile = path.join(path.dirname(process.argv[1]), 'colors.json');
const colors = JSON.parse(fs.readFileSync(colorsFile));

const fieldsToGenerate = process.argv.slice(2);

for(const field of fieldsToGenerate) {
  colors[field] = {};

  const uniqueValues = Array.from(new Set(events.map(f => f[field])));
  for(const value of uniqueValues) {
    colors[field][value] = randomColor();
  }
}

console.log(colors);
fs.writeFileSync(colorsFile, JSON.stringify(colors, null, '  '));
