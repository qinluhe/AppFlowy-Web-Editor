const fs = require('fs');
const path = require('path');

// Read CSS file
const cssFilePath = path.join(__dirname, '../src/styles/variables/light.variables.css');
const cssContent = fs.readFileSync(cssFilePath, 'utf-8');

// Extract color variables
const colorVariables = cssContent.match(/--[\w-]+:\s*#[0-9a-fA-F]{6}/g);

if (!colorVariables) {
  console.error('No color variables found in CSS file.');
  process.exit(1);
}

// Generate Tailwind CSS colors configuration
// Replace -- with _ and - with _ in color variable names
const tailwindColors = colorVariables.reduce((colors, variable) => {
  const [name, value] = variable.split(':').map(str => str.trim());
  const formattedName = name.replace('--', '').replace(/-/g, '_');
  const category = formattedName.split('_')[0];
  const key = formattedName.replace(`${category}_`, '');

  if (!colors[category]) {
    colors[category] = {};
  }
  colors[category][key] = `var(${name})`;
  return colors;
}, {});

const tailwindColorsFormatted = JSON.stringify(tailwindColors, null, 2)
  .replace(/_/g, '-');

const tailwindConfigFilePath = path.join(__dirname, '../colors.json');
fs.writeFileSync(tailwindConfigFilePath, tailwindColorsFormatted, 'utf-8');

console.log('Tailwind CSS colors configuration generated successfully.');
