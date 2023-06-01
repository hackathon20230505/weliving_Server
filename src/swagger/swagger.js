import swaggerUi from 'swagger-ui-express';
import swaggereJsdoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "WellDying",
        description:
          "WellDying AI",
      },
      servers: [
        {
          url: "http://localhost:8080", // 요청 URL
        },
      ],
    },
    apis: ["src/**/*.js",], //Swagger 파일 연동
}

const specs = swaggereJsdoc(options);

export { specs, swaggerUi };
