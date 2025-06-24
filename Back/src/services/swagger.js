const swaggerAutoGen = require('swagger-autogen')('pt-BR');

const doc = {
    info: {
        version: '1.0.0',
        title: 'PREMIA RH - Sistema de Gerenciamento de Funcionários',
        description: 'PREMIA RH - Sistema de Gerenciamento de Funcionários'
    },
    host: 'localhost:3000',
    basePath: '',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

const outputFile = './src/docs/swagger.yaml';
const endpointsFile = ['./src/routes/employees.js',];

swaggerAutoGen(outputFile, endpointsFile, doc);