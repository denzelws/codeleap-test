// plopfile.cjs
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Gerar um novo componente React + SCSS',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nome do componente:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.scss',
        templateFile: 'plop-templates/Component.scss.hbs',
        skipIfExists: true,
      },
    ],
  });
};