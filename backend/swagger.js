// swagger.js
import swaggerAutogen from 'swagger-autogen';

const doc = {
  swagger: "2.0", // ✅ Required for Swagger 2.0
  info: {
    title: 'SK SAHU JAIN ERP API',
    description: 'Auto-generated Swagger docs',
    version: '1.0.0',
  },
  host: 'localhost:5000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your JWT token in the format: Bearer <token>',
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = './swagger-output.json'; // This file will be created
const endpointsFiles = ['./app.js']; // Your main Express app file

swaggerAutogen()(outputFile, endpointsFiles, doc);
