const participantsService = require('../services/participants');
const ApiResponse = require('../utils/ApiResponse');

const getAll = async (_req, res, next) => {
    try {
        const result = await participantsService.getAll();
        return ApiResponse.success(res, result);
    } catch (error) {
        next(error);
    }
};

const post = async (req, res, next) => {
    try {
        const newParticipant = await participantsService.post(req.body);
        return ApiResponse.created(res, newParticipant, 'Participante adicionado com sucesso');
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        await participantsService.destroy(req.params);
        return ApiResponse.noContent(res, 'Participante excluído com sucesso');
    } catch (error) {
        next(error);
    }
};

const put = async (req, res, next) => {
    try {
        const updatedParticipant = await participantsService.put({ ...req.body, id: req.params.id });
        return ApiResponse.success(res, updatedParticipant, 'Participante atualizado com sucesso');
    } catch (error) {
        next(error);
    }
};

const patch = async (req, res, next) => {
    try {
        const updatedParticipant = await participantsService.patch({ ...req.body, id: req.params.id });
        return ApiResponse.success(res, updatedParticipant, 'Participante atualizado com sucesso');
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const participant = await participantsService.getById(req.params.id);
        if (!participant) {
            return ApiResponse.notFound(res, 'Participante não encontrado');
        }

        return ApiResponse.success(res, participant);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, post, destroy, put, patch, getById };