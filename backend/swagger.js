import swaggerAutogen from 'swagger-autogen';

const doc = {
  swagger: "2.0",
  info: {
    title: 'SK SAHU JAIN ERP API',
    description: 'Auto-generated Swagger docs',
    version: '1.0.0',
  },
  host: 'localhost:5000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json', 'multipart/form-data'],
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
  paths: {
    '/api/v1/personalInfo/create': {
      post: {
        tags: ['Personal Info'],
        summary: 'Register personal info with photo and signature',
        description: 'Uploads candidate photo, signature, and other form fields',
        consumes: ['multipart/form-data'],
        parameters: [
          { in: 'formData', name: 'candidate_photo', type: 'file', required: true, description: 'Candidate photo' },
          { in: 'formData', name: 'candidate_signature', type: 'file', required: true, description: 'Candidate signature' },

          { in: 'formData', name: 'firstName', type: 'string', required: true },
          { in: 'formData', name: 'middleName', type: 'string' },
          { in: 'formData', name: 'lastName', type: 'string' },
          { in: 'formData', name: 'email', type: 'string', required: true },
          { in: 'formData', name: 'mobileNumber', type: 'string', required: true },
          { in: 'formData', name: 'whatsappNumber', type: 'string' },
          { in: 'formData', name: 'dob', type: 'string' },
          { in: 'formData', name: 'gender', type: 'string' },
          { in: 'formData', name: 'nationality', type: 'string' },
          { in: 'formData', name: 'caste', type: 'string' },
          { in: 'formData', name: 'specialCategory', type: 'string' },
          { in: 'formData', name: 'religion', type: 'string' },
          { in: 'formData', name: 'aadharNumber', type: 'string' },
          { in: 'formData', name: 'voterId', type: 'string' },
          { in: 'formData', name: 'weightageClaimed', type: 'string' },
          { in: 'formData', name: 'Paddress', type: 'string' },
          { in: 'formData', name: 'Pcity', type: 'string' },
          { in: 'formData', name: 'Pstate', type: 'string' },
          { in: 'formData', name: 'Ppin', type: 'string' },
          { in: 'formData', name: 'Taddress', type: 'string' },
          { in: 'formData', name: 'Tcity', type: 'string' },
          { in: 'formData', name: 'Tstate', type: 'string' },
          { in: 'formData', name: 'Tpin', type: 'string' },
          { in: 'formData', name: 'fathersName', type: 'string' },
          { in: 'formData', name: 'mothersName', type: 'string' },
          { in: 'formData', name: 'parentsMobile', type: 'string' },
          { in: 'formData', name: 'verificationCode', type: 'string' },

          {
            in: 'header',
            name: 'Authorization',
            required: true,
            type: 'string',
            description: 'Bearer <token>',
          }
        ],
        responses: {
          201: {
            description: 'Created',
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                data: { type: 'object' },
              },
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
