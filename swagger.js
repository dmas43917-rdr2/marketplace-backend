 const swaggerJsdoc = require('swagger-jsdoc');

 const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Marketplace API Dani',
            version: '1.0.0',
            description: 'API untuk marketplace backend',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
 };

 const swaggerSpec = swaggerJsdoc(options);

 module.exports = swaggerSpec;