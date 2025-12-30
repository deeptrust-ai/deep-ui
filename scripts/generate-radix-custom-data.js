// scripts/generate-radix-custom-data.js
import fs from 'fs';
import path from 'path';

const pkgDir = path.resolve('node_modules', '@radix-ui', 'themes');
if (!fs.existsSync(pkgDir)) {
  console.error('@radix-ui/themes not found in node_modules. Run `npm install` first.');
  process.exit(1);
}

// Find any CSS files in the package
const cssFiles = fs.readdirSync(pkgDir).filter((f) => f.endsWith('.css') || f.endsWith('.min.css'));
if (cssFiles.length === 0) {
  console.error('No .css files found in @radix-ui/themes package.');
  process.exit(1);
}

// Prefer an obvious entry like index.css or theme.css
const cssPath = cssFiles.includes('index.css') ? 'index.css' : cssFiles[0];
const css = fs.readFileSync(path.join(pkgDir, cssPath), 'utf8');

// Regexp: capture --variables: value;
const re = /(--[a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;
const props = [];
let m;
while ((m = re.exec(css))) {
  props.push({
    name: m[1],
    description: `From @radix-ui/themes/${cssPath}`,
    values: [m[2].trim()],
  });
}

// Write output into .vscode so VS Code can reference it
const outDir = path.resolve('.vscode');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
const outPath = path.join(outDir, 'radix-colors.custom-data.json');
const json = { version: 1.1, properties: props };
fs.writeFileSync(outPath, JSON.stringify(json, null, 2));
console.log('Wrote', outPath, 'with', props.length, 'properties');
