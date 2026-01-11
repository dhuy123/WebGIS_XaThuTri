const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WebGIS xã Thư Trì API",
      version: "1.0.0",
      description: "Tài liệu API cho ứng dụng Node.js",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },

  // Nơi Swagger sẽ đọc mô tả API trong JS docs
  apis: ["./routes/*.js"]

};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
