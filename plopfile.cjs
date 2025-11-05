const fs = require('node:fs');
const path = require('node:path');

module.exports = (plop) => {
  const componentRoot = 'lib';
  const componentLayers = ['atom', 'molecule', 'compound'];

  plop.setGenerator('component', {
    description: 'Create a new UI component package',
    prompts: [
      {
        type: 'list',
        name: 'componentType',
        message: 'Which component layer?',
        choices: componentLayers,
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase)',
        validate: (value) => {
          if (!value?.trim()) {
            return 'A component name is required.';
          }

          const sanitized = plop.getHelper('pascalCase')(value);
          if (!/^[A-Z][A-Za-z0-9]*$/.test(sanitized)) {
            return 'Use alphanumeric characters only (e.g. MyComponent).';
          }

          return true;
        },
      },
      {
        type: 'confirm',
        name: 'useTypes',
        message: 'Generate a types file?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'useStyles',
        message: 'Generate a CSS module?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'useStory',
        message: 'Generate a Storybook story?',
        default: true,
      },
    ],
    actions: (answers) => {
      const actions = [];
      const pascalName = plop.getHelper('pascalCase')(answers.name);
      const basePath = path.posix.join(componentRoot, answers.componentType, '{{pascalCase name}}');

      actions.push({
        type: 'add',
        path: path.posix.join(basePath, 'index.tsx'),
        templateFile: 'plop-templates/component/index.tsx.hbs',
        data: {
          useTypes: answers.useTypes,
          useStyles: answers.useStyles,
          hasImports: answers.useTypes || answers.useStyles,
        },
      });

      if (answers.useTypes) {
        actions.push({
          type: 'add',
          path: path.posix.join(basePath, 'types.ts'),
          templateFile: 'plop-templates/component/types.ts.hbs',
        });
      }

      if (answers.useStyles) {
        actions.push({
          type: 'add',
          path: path.posix.join(basePath, 'styles.module.css'),
          templateFile: 'plop-templates/component/styles.module.css.hbs',
        });
      }

      if (answers.useStory) {
        actions.push({
          type: 'add',
          path: path.posix.join(basePath, `${pascalName}.stories.tsx`),
          templateFile: 'plop-templates/component/stories.tsx.hbs',
          data: {
            useTypes: answers.useTypes,
            componentType: answers.componentType,
          },
        });
      }

      const exportLine = answers.useTypes
        ? `export { default as ${pascalName}, type I${pascalName}Props } from './${pascalName}';`
        : `export { default as ${pascalName} } from './${pascalName}';`;

      const indexPath = path.join(
        plop.getPlopfilePath(),
        componentRoot,
        answers.componentType,
        'index.ts',
      );

      if (!fs.existsSync(indexPath)) {
        actions.push({
          type: 'add',
          path: path.posix.join(componentRoot, answers.componentType, 'index.ts'),
          template: `${exportLine}\n`,
        });
      } else {
        actions.push({
          type: 'append',
          path: path.posix.join(componentRoot, answers.componentType, 'index.ts'),
          pattern: /$/,
          template: `\n${exportLine}`,
          skip: () => {
            const contents = fs.readFileSync(indexPath, 'utf8');
            if (contents.includes(`default as ${pascalName}`)) {
              return `Export for ${pascalName} already exists in ${path.posix.join(componentRoot, answers.componentType, 'index.ts')}`;
            }
            return undefined;
          },
        });
      }

      const libraryIndexPath = path.join(plop.getPlopfilePath(), componentRoot, 'index.ts');
      const libraryIndexRelative = path.posix.join(componentRoot, 'index.ts');
      const layerExportLine = `export * from './${answers.componentType}';`;

      if (!fs.existsSync(libraryIndexPath)) {
        actions.push({
          type: 'add',
          path: libraryIndexRelative,
          template: `${layerExportLine}\n`,
        });
      } else {
        actions.push({
          type: 'append',
          path: libraryIndexRelative,
          pattern: /$/,
          template: `\n${layerExportLine}`,
          skip: () => {
            const contents = fs.readFileSync(libraryIndexPath, 'utf8');
            if (contents.includes(layerExportLine)) {
              return `Root index already exports ${answers.componentType} layer`;
            }
            return undefined;
          },
        });
      }

      return actions;
    },
  });
};
