const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '../src/types/icons.d.ts');
const iconSet = require('../src/components/Icon/icons.json');

const iconNames = iconSet.icons.map(icon => icon.properties.name);

const typeContent = `// This file is auto-generated. Do not edit manually.
// To regenerate, run 'node generateIconTypes.js'

/**
 * Available icon names in the application
 */
type IconNames = ${iconNames.map(name => `'${name}'`).join(' | ')};
`;

// Write the declaration file
fs.writeFileSync(outputPath, typeContent);

console.log(`Icon types declaration file generated at ${outputPath}`);
