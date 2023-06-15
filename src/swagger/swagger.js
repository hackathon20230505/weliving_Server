import swaggerUi from 'swagger-ui-express';
import swaggereJsdoc from 'swagger-jsdoc';

var swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Well-Living",
      description:
        "WellLiving API",
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  }
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["src/**/*.js",], //Swagger 파일 연동
}

const specs = swaggereJsdoc(options);

export { specs, swaggerUi };
