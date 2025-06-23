const employeesService = require('../services/employees');
const ApiResponse = require('../utils/ApiResponse');

const getAll = async (_req, res, next) => {
    try {
        const result = await employeesService.getAll();
        return ApiResponse.success(res, result);
    } catch (error) {
        next(error);
    }
};

const post = async (req, res, next) => {
    try {
        const newEmployee = await employeesService.post(req.body);
        return ApiResponse.created(res, newEmployee, 'Funcionário adicionado com sucesso');
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        await employeesService.destroy(req.params);
        return ApiResponse.noContent(res, 'Funcionário excluído com sucesso');
    } catch (error) {
        next(error);
    }
};

const put = async (req, res, next) => {
    try {
        const updatedEmployee = await employeesService.put({ ...req.body, id: req.params.id });
        return ApiResponse.success(res, updatedEmployee, 'Funcionário atualizado com sucesso');
    } catch (error) {
        next(error);
    }
};

const patch = async (req, res, next) => {
    try {
        const updatedEmployee = await employeesService.patch({ ...req.body, id: req.params.id });
        return ApiResponse.success(res, updatedEmployee, 'Funcionário atualizado com sucesso');
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const employee = await employeesService.getById(req.params.id);
        if (!employee) {
            return ApiResponse.notFound(res, 'Funcionário não encontrado');
        }

        return ApiResponse.success(res, employee);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, post, destroy, put, patch, getById };