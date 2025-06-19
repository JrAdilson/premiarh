const swaggerAutoGen = require('swagger-autogen')('pt-BR');

const doc = {
    info: {
        version: '1.0.0',
        title: 'Teste Prático - Desenvolvedor WEB (DASS 2025)',
        description: 'Teste Prático - Desenvolvedor WEB (DASS 2025)'
    },
    host: 'localhost:3000',
    basePath: '',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

const outputFile = './src/docs/swagger.yaml';
const endpointsFile = ['./src/routes/participants.js',];

swaggerAutoGen(outputFile, endpointsFile, doc);