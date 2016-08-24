import plur from 'plur';
import uppercamelcase from 'uppercamelcase';

export default plop => {
  plop.addHelper('plur', word => plur(word, 2));
  plop.addHelper('plurUpperCase', word => uppercamelcase(plur(word, 2)));

  plop.setGenerator('api', {
    description: 'Create an api',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your api?'
      },
      {
        type: 'confirm',
        name: 'auth',
        message: 'Do you want to add auth?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'api/api/{{name}}/index.js',
        templateFile: 'plop/api/index.hbs'
      },
      {
        type: 'add',
        path: 'api/api/{{name}}/{{name}}.controller.js',
        templateFile: 'plop/api/controller.hbs'
      },
      {
        type: 'add',
        path: 'api/api/{{name}}/{{name}}.model.js',
        templateFile: 'plop/api/model.hbs'
      },
      {
        type: 'add',
        path: 'api/config/seed/{{plur name}}.js',
        templateFile: 'plop/api/seed.hbs'
      },
      {
        type: 'modify',
        path: 'api/config/express/routes.js',
        pattern: /(\/\/ inject:route-imports)/gi,
        template: '$1\r\nimport {{name}}Route from \'../../api/{{name}}\';'
      },
      {
        type: 'modify',
        path: 'api/config/express/routes.js',
        pattern: /(\/\/ inject:route-usage)/gi,
        template: '$1\r\n  app.use(\'/api/{{plur name}}\'\, {{name}}Route);'
      },
      {
        type: 'modify',
        path: 'api/config/seed/index.js',
        pattern: /(\/\/ inject:seed-imports)/gi,
        template: '$1\r\nimport populate{{plurUpperCase name}} from \'./{{plur name}}\';'
      },
      {
        type: 'modify',
        path: 'api/config/seed/index.js',
        pattern: /(\/\/ inject:seed-populate)/gi,
        template: '$1\r\n  .then(() => populate{{plurUpperCase name}}())'
      }
    ]
  });
};