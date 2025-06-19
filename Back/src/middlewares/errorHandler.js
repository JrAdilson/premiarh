const ApiResponse = require('../utils/ApiResponse');
const Http = require('../utils/Http');

const errorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
        if (err.fields?.email) {
            return ApiResponse.badRequest(res, 'Email já cadastrado');
        }
        if (err.fields?.cpf) {
            return ApiResponse.badRequest(res, 'CPF já cadastrado');
        }
    }

    if (err.name === 'SequelizeValidationError') {
        const messages = err.errors.map(error => error.message);
        return ApiResponse.badRequest(res, 'Dados inválidos', messages);
    }

    return ApiResponse.error(
        res, err.message || 'Erro interno do servidor', 
        Http.INTERNAL_SERVER_ERROR
    );
};

module.exports = errorHandler;