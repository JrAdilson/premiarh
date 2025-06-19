const { Participant } = require('../entity');

const getAll = async () => {
    const participants = await Participant.findAll({ 
        order: [['created_at', 'DESC']] 
    });
    
    return { 
        total: participants.length,
        participants
    };
};

const post = async (params) => {
    const { name, email, cpf, shirt_size, shoe_size } = params;
    
    return await Participant.create({
        name,
        email,
        cpf,
        shirt_size,
        shoe_size
    });
};

const destroy = async (params) => {
    const { id } = params;
    return await Participant.destroy({ where: { id }});
};

const put = async (params) => {
    const { id, name, email, cpf, shirt_size, shoe_size } = params;
    const [updated] = await Participant.update({
        name,
        email,
        cpf,
        shirt_size,
        shoe_size
    }, { where: { id } });
    
    if (updated === 0) {
        throw new Error('Participante não encontrado');
    }
    
    return await Participant.findByPk(id);
};

const patch = async (params) => {
    const { id, ...updateFields } = params;
    const [updated] = await Participant.update(updateFields, { where: { id } });
    
    if (updated === 0) {
        throw new Error('Participante não encontrado');
    }
    
    return await Participant.findByPk(id);
};

const getById = async (id) => {
    const participant = await Participant.findByPk(id);
    if (!participant) {
        throw new Error('Participante não encontrado');
    }

    return participant;
};

const getByEmail = async (email) => {
    return await Participant.findOne({ where: { email } });
};

const getByCpf = async (cpf) => {
    return await Participant.findOne({ where: { cpf }});
};

module.exports = { getAll, post, destroy, put, patch, getById, getByEmail, getByCpf };