const { isSwaggerEnabled } = require('../config');

const configureSwagger = app => {
  if (isSwaggerEnabled) {
    // TODO: complete all swagger parameters and object types
    const expressJSDocSwagger = require('express-jsdoc-swagger');
    const pjson = require('../package.json');
    const options = {
      info: {
        version: pjson.version,
        title: pjson.name,
        description: pjson.description,
        license: {
          name: 'victor',
        },
        contact: {
          name: 'victor',
          email: 'supergothere@gmail.com',
        },
      },
      security: {
        BearerAuth: {
          type: 'apiKey',
          name: 'sctId',
          in: 'header',
        },
      },
      baseDir: __dirname,
      filesPattern: '../**/**/*.js',
      swaggerUIPath: '/api-docs',
      exposeSwaggerUI: true,
      exposeApiDocs: false,
      apiDocsPath: '/v3/api-docs',
      notRequiredAsNullable: false,
      swaggerUiOptions: {},
    };
    expressJSDocSwagger(app)(options);
  }
};

module.exports = {
  configureSwagger,
};
