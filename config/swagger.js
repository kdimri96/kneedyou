const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KneedYou API's",
      version: "1.0.0",
      description: "API documentation for KneedYou APP",
    },
    servers: [
      {
        url: "https://kneedyou.onrender.com", // use localhost:5000 if testing locally https://kneedyou.onrender.com
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // this will scan your route files for Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
