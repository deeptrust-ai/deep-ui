#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.env.FIGMA_TOKENS_ROOT || './scripts/tokens';
const FILES = {
  light: path.join(ROOT, 'Light.tokens.json'),
  dark: path.join(ROOT, 'Dark.tokens.json'),
  radiusModes: path.join(ROOT, 'Radius.tokens.json'),
  spaceModes: path.join(ROOT, 'Space.tokens.json'),
  theme: path.join(ROOT, 'Theme.tokens.json'),
};
const OUT = path.join(process.cwd(), './lib/styles/colors.css');
// Figma exports can emit alpha like 0.999999 for visually opaque colors.
// Treat near-opaque values as fully opaque so output stays canonical (#RRGGBB).
const ALPHA_OPAQUE_THRESHOLD = 0.999;

const readJson = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    try {
      return JSON.parse(content);
    } catch (parseError) {
      throw new Error(
        `Failed to parse JSON from "${filePath}". ` +
          'Ensure the file contains valid JSON exported from Figma. ' +
          `Original error: ${parseError.message}`,
      );
    }
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      throw new Error(
        `Required Figma tokens file not found: "${filePath}". ` +
          'Make sure you have exported tokens from Figma to this path.',
      );
    }
    throw new Error(
      `Failed to read Figma tokens file "${filePath}". ` +
        `Original error: ${err.message}`,
    );
  }
};

const walkTokenLeaves = (obj, pathParts = [], out = []) => {
  if (!obj || typeof obj !== 'object') return out;
  if ('$type' in obj && '$value' in obj) {
    out.push({
      path: pathParts.join('/'),
      type: obj.$type,
      value: obj.$value,
      extensions: obj.$extensions || {},
    });
    return out;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$extensions') continue;
    walkTokenLeaves(value, [...pathParts, key], out);
  }
  return out;
};

const normalizeFigmaRef = (value) => value.replace(/^[{]|[}]$/g, '').replace(/\./g, '/');

const toColor = (value) => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && typeof value.hex === 'string') {
    const hex = value.hex.toUpperCase();
    const alpha = typeof value.alpha === 'number' ? value.alpha : 1;
    if (alpha >= ALPHA_OPAQUE_THRESHOLD) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')})`;
  }
  throw new Error(`Unsupported color value: ${JSON.stringify(value)}`);
};

const parseColorToRgb = (value) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  const hexMatch = trimmed.match(/^#([0-9a-fA-F]{6})$/);
  if (hexMatch) {
    const hex = hexMatch[1];
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  const rgbMatch = trimmed.match(
    /^rgba?\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)(?:\s*,\s*[0-9.]+\s*)?\)$/
  );
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
  }
  return null;
};

const chooseContrast = (colorValue, lightContrast, darkContrast) => {
  const rgb = parseColorToRgb(colorValue);
  if (!rgb) return lightContrast;
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance > 0.5 ? darkContrast : lightContrast;
};

const kebab = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/%/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/--+/g, '-')
    .toLowerCase()
    .replace(/^-|-$/g, '');

const lightTokens = walkTokenLeaves(readJson(FILES.light));
const darkTokens = walkTokenLeaves(readJson(FILES.dark));
const themeTokens = walkTokenLeaves(readJson(FILES.theme));
const themeTokenByPath = new Map(themeTokens.map((token) => [token.path, token]));
const radiusModes = readJson(FILES.radiusModes);
const spaceModes = readJson(FILES.spaceModes);

const makeColorMap = (tokens) => {
  const map = new Map();
  for (const token of tokens) {
    if (token.type !== 'color') continue;
    map.set(token.path, toColor(token.value));
  }
  return map;
};

const lightMap = makeColorMap(lightTokens);
const darkMap = makeColorMap(darkTokens);

const readModeToken = (collection, mode, key) => {
  const token = collection?.[mode]?.[key] ?? (key === '9' ? collection?.[mode]?.['09'] : undefined);
  if (!token || typeof token !== 'object' || !('$value' in token)) {
    return undefined;
  }
  return token.$value;
};

const resolveThemeColor = (token, fallbackMap) => {
  if (typeof token.value === 'string' && token.value.startsWith('{') && token.value.endsWith('}')) {
    const targetPath = normalizeFigmaRef(token.value);
    const targetToken = themeTokenByPath.get(targetPath);
    if (targetToken) {
      return resolveThemeColor(targetToken, fallbackMap);
    }
  }
  const aliasName = token.extensions?.['com.figma.aliasData']?.targetVariableName;
  if (aliasName && fallbackMap.has(aliasName)) {
    return fallbackMap.get(aliasName);
  }
  return toColor(token.value);
};

const collectThemeColors = () => {
  const entries = [];

  const push = (pathPrefix, cssPrefix, alpha = false) => {
    const prefixParts = pathPrefix.split('/');
    for (const token of themeTokens) {
      if (token.type !== 'color') continue;
      const tokenParts = token.path.split('/');
      if (tokenParts.length !== prefixParts.length + 1) continue;
      if (!prefixParts.every((part, index) => tokenParts[index] === part)) continue;
      const suffix = tokenParts[tokenParts.length - 1];
      const numericSuffix = kebab(suffix);
      entries.push({
        cssVar: alpha ? `--${cssPrefix}-a${numericSuffix}` : `--${cssPrefix}-${numericSuffix}`,
        light: resolveThemeColor(token, lightMap),
        dark: resolveThemeColor(token, darkMap),
      });
    }
  };

  // Keep accent from Theme A; canonical gray/blue/green/yellow/red/orange
  // are sourced directly from the Color scheme exports.
  push('Colors/Accent/Accent', 'accent');
  push('Colors/Accent/Accent Alpha', 'accent', true);

  return entries;
};

const collectCanonicalSchemePalette = (paletteName, cssPrefix) => {
  const entries = [];
  for (let i = 1; i <= 12; i += 1) {
    const colorPath = `Colors/${paletteName}/${i}`;
    const alphaPath = `Colors/${paletteName} Alpha/${i}`;
    if (!lightMap.has(colorPath) || !darkMap.has(colorPath)) continue;
    entries.push({
      cssVar: `--${cssPrefix}-${i}`,
      light: lightMap.get(colorPath),
      dark: darkMap.get(colorPath),
    });
    if (lightMap.has(alphaPath) && darkMap.has(alphaPath)) {
      entries.push({
        cssVar: `--${cssPrefix}-a${i}`,
        light: lightMap.get(alphaPath),
        dark: darkMap.get(alphaPath),
      });
    }
  }
  return entries;
};

const collectSchemePalette = (paletteName) => {
  const name = kebab(paletteName);
  const full = [];
  for (let i = 1; i <= 12; i += 1) {
    const colorPath = `Colors/${paletteName}/${i}`;
    const alphaPath = `Colors/${paletteName} Alpha/${i}`;
    if (!lightMap.has(colorPath) || !darkMap.has(colorPath)) {
      continue;
    }
    full.push({
      cssVar: `--${name}-${i}`,
      light: lightMap.get(colorPath),
      dark: darkMap.get(colorPath),
    });
    if (lightMap.has(alphaPath) && darkMap.has(alphaPath)) {
      full.push({
        cssVar: `--${name}-a${i}`,
        light: lightMap.get(alphaPath),
        dark: darkMap.get(alphaPath),
      });
    }
  }
  return full;
};

const buildColorEntries = () => {
  const entries = [];

  // Semantic palette vars used by Deep UI components.
  entries.push(...collectThemeColors());

  // Canonical palette variables map directly to the Figma Color scheme export.
  entries.push(...collectCanonicalSchemePalette('Gray', 'gray'));
  entries.push(...collectCanonicalSchemePalette('Blue', 'blue'));
  entries.push(...collectCanonicalSchemePalette('Green', 'green'));
  entries.push(...collectCanonicalSchemePalette('Yellow', 'yellow'));
  entries.push(...collectCanonicalSchemePalette('Red', 'red'));
  entries.push(...collectCanonicalSchemePalette('Orange', 'orange'));

  // Keep full base palettes available to avoid regressions in downstream styles.
  const palettes = ['Slate', 'Indigo', 'Sky', 'Green', 'Yellow', 'Red', 'Orange', 'Gray'];
  for (const palette of palettes) {
    entries.push(...collectSchemePalette(palette));
  }

  // Tokens/Colors semantic values from Theme A.
  const tokenMap = new Map(
    themeTokens
      .filter((token) => token.path.startsWith('Tokens/Colors/') && token.type === 'color')
      .map((token) => [token.path.replace('Tokens/Colors/', ''), token])
  );

  const addTokenColor = (tokenName, cssVarName) => {
    const token = tokenMap.get(tokenName);
    if (!token) return;
    entries.push({
      cssVar: `--${cssVarName}`,
      light: resolveThemeColor(token, lightMap),
      dark: resolveThemeColor(token, darkMap),
    });
  };

  addTokenColor('page-background', 'color-background');
  addTokenColor('surface', 'color-background-header');
  addTokenColor('text', 'color-text');
  addTokenColor('overlay', 'color-overlay');
  addTokenColor('accent-contrast', 'accent-contrast');
  addTokenColor('accent-surface', 'accent-surface');

  const whiteContrastToken = tokenMap.get('white-contrast');
  const blackContrastToken = tokenMap.get('black-contrast');
  const whiteContrast = whiteContrastToken
    ? {
        light: resolveThemeColor(whiteContrastToken, lightMap),
        dark: resolveThemeColor(whiteContrastToken, darkMap),
      }
    : { light: '#FFFFFF', dark: '#FFFFFF' };
  const blackContrast = blackContrastToken
    ? {
        light: resolveThemeColor(blackContrastToken, lightMap),
        dark: resolveThemeColor(blackContrastToken, darkMap),
      }
    : { light: '#000000', dark: '#000000' };

  // Overlay alpha ramps from color scheme.
  for (let i = 1; i <= 12; i += 1) {
    const whitePath = `Overlays/White Alpha/${i}`;
    const blackPath = `Overlays/Black Alpha/${i}`;
    if (lightMap.has(whitePath) && darkMap.has(whitePath)) {
      entries.push({
        cssVar: `--white-a${i}`,
        light: lightMap.get(whitePath),
        dark: darkMap.get(whitePath),
      });
    }
    if (lightMap.has(blackPath) && darkMap.has(blackPath)) {
      entries.push({
        cssVar: `--black-a${i}`,
        light: lightMap.get(blackPath),
        dark: darkMap.get(blackPath),
      });
    }
  }

  // Stable order and dedupe by css var (first entry wins).
  const deduped = new Map();
  for (const entry of entries) {
    if (!deduped.has(entry.cssVar)) deduped.set(entry.cssVar, entry);
  }

  const companionPalettes = ['accent', 'gray', 'blue', 'green', 'yellow', 'red', 'orange'];
  for (const palette of companionPalettes) {
    const a2 = deduped.get(`--${palette}-a2`);
    const nine = deduped.get(`--${palette}-9`);
    if (!deduped.has(`--${palette}-contrast`)) {
      deduped.set(`--${palette}-contrast`, {
        cssVar: `--${palette}-contrast`,
        light: chooseContrast(nine?.light, whiteContrast.light, blackContrast.light),
        dark: chooseContrast(nine?.dark, whiteContrast.dark, blackContrast.dark),
      });
    }
    if (!deduped.has(`--${palette}-surface`) && a2) {
      deduped.set(`--${palette}-surface`, {
        cssVar: `--${palette}-surface`,
        light: a2.light,
        dark: a2.dark,
      });
    }
    if (!deduped.has(`--${palette}-indicator`) && nine) {
      deduped.set(`--${palette}-indicator`, {
        cssVar: `--${palette}-indicator`,
        light: nine.light,
        dark: nine.dark,
      });
    }
    if (!deduped.has(`--${palette}-track`) && nine) {
      deduped.set(`--${palette}-track`, {
        cssVar: `--${palette}-track`,
        light: nine.light,
        dark: nine.dark,
      });
    }
  }

  return [...deduped.values()].sort((a, b) => a.cssVar.localeCompare(b.cssVar));
};

const formatNumeric = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    throw new Error(`Expected a numeric token value, received: ${String(value)}`);
  }
  return Number.isInteger(numeric) ? String(numeric) : String(Number(numeric.toFixed(3)));
};

const unitlessNumberPattern = /^[+-]?(\d+(\.\d+)?|\.\d+)$/;

const measurementToken = (value, unit = 'px') => {
  if (typeof value === 'number') {
    return `${formatNumeric(value)}${unit}`;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      throw new Error('Expected a non-empty measurement token string.');
    }
    if (unit && unitlessNumberPattern.test(trimmed)) {
      return `${formatNumeric(trimmed)}${unit}`;
    }
    // Keep explicit CSS units/percentages/functions exactly as provided.
    return trimmed;
  }
  throw new Error(`Unsupported measurement token value: ${JSON.stringify(value)}`);
};

const collectNonColorTokens = () => {
  const lines = [];

  // Radius from explicit radius mode file only. If a token is missing, do not emit
  // an override so Radix defaults remain in effect.
  for (const key of ['1', '2', '3', '4', '5', '6', '1-max', '2-max', '3-max', '4-max', '5-max', '6-max']) {
    const radiusValue = readModeToken(radiusModes, 'Medium', key);
    if (radiusValue !== undefined) {
      lines.push(`  --radius-${kebab(key)}: ${measurementToken(radiusValue)};`);
    }
  }

  // Spacing from explicit scale file (100% mode as default).
  for (const key of ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
    lines.push(`  --space-${kebab(key)}: ${measurementToken(readModeToken(spaceModes, '100%', key))};`);
  }

  // Typography from Theme A.
  for (const token of themeTokens) {
    if (token.path.startsWith('Typography/Font size/') && token.type === 'number') {
      const suffix = token.path.replace('Typography/Font size/', '');
      lines.push(`  --font-size-${kebab(suffix)}: ${measurementToken(token.value)};`);
    }
    if (token.path.startsWith('Typography/Line height/') && token.type === 'number') {
      const suffix = token.path.replace('Typography/Line height/', '');
      lines.push(`  --line-height-${kebab(suffix)}: ${measurementToken(token.value)};`);
    }
    if (token.path.startsWith('Typography/Letter spacing/') && token.type === 'number') {
      const suffix = token.path.replace('Typography/Letter spacing/', '');
      lines.push(`  --letter-spacing-${kebab(suffix)}: ${measurementToken(token.value, 'px')};`);
    }
    if (token.path.startsWith('Typography/Font weight/') && (token.type === 'number' || token.type === 'string')) {
      const suffix = token.path.replace('Typography/Font weight/', '');
      lines.push(`  --font-weight-${kebab(suffix)}: ${measurementToken(token.value, '')};`);
    }
    if (token.path.startsWith('Typography/Font family/') && token.type === 'string') {
      const suffix = token.path.replace('Typography/Font family/', '');
      lines.push(`  --font-family-${kebab(suffix)}: ${token.value};`);
    }
  }

  lines.sort();
  return lines;
};

const colorEntries = buildColorEntries();
const nonColorLines = collectNonColorTokens();

const toBlock = (selector, lines) => `${selector} {\n${lines.join('\n')}\n}\n`;

const lightLines = colorEntries.map((entry) => `  ${entry.cssVar}: ${entry.light};`);
const darkLines = colorEntries.map((entry) => `  ${entry.cssVar}: ${entry.dark};`);

const radiusModeSelectors = ['None', 'Small', 'Medium', 'Large', 'Full'];
const radiusModeBlocks = radiusModeSelectors
  .map((mode) => {
    const lines = ['1', '2', '3', '4', '5', '6', '1-max', '2-max', '3-max', '4-max', '5-max', '6-max']
      .map((key) => {
        const radiusValue = readModeToken(radiusModes, mode, key);
        if (radiusValue === undefined) return null;
        return `  --radius-${kebab(key)}: ${measurementToken(radiusValue)};`;
      })
      .filter(Boolean);

    if (lines.length === 0) return '';
    return toBlock(`[data-token-radius-mode='${mode.toLowerCase()}']`, lines);
  })
  .filter(Boolean)
  .join('\n');

const spaceScaleSelectors = ['90%', '95%', '100%', '105%', '110%'];
const spaceScaleBlocks = spaceScaleSelectors
  .map((scale) => {
    const lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
      (key) => `  --space-${kebab(key)}: ${measurementToken(readModeToken(spaceModes, scale, key))};`
    );
    return toBlock(`[data-token-space-scale='${kebab(scale)}']`, lines);
  })
  .join('\n');

const commentPath = (filePath) => {
  const relative = path.relative(ROOT, filePath);
  if (relative && !relative.startsWith('..') && !path.isAbsolute(relative)) {
    return relative;
  }
  return path.basename(filePath);
};

const css = `/**
 * Generated from Figma token exports.
 * Source files:
 * - ${commentPath(FILES.light)}
 * - ${commentPath(FILES.dark)}
 * - ${commentPath(FILES.theme)}
 * - ${commentPath(FILES.radiusModes)}
 * - ${commentPath(FILES.spaceModes)}
 *
 * Do not edit manually. Re-run:
 *   node scripts/sync-figma-tokens.js
 */

:root,
.light,
.light-theme {
${nonColorLines.join('\n')}
}

${toBlock(':root,\n.light,\n.light-theme', lightLines)}
${toBlock('.dark,\n.dark-theme', darkLines)}
${radiusModeBlocks}
${spaceScaleBlocks}`;

fs.writeFileSync(OUT, css);
console.log(`Wrote ${OUT} with ${colorEntries.length} color vars and ${nonColorLines.length} non-color vars.`);
