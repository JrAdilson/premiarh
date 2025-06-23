const { Employee } = require("../entity");

const getAll = async () => {
  //const filtros = await getFiltros();
  const employees = await Employee.findAll({
    order: [["created_at", "DESC"]],
  });

  return {
    total: employees.length,
    employees,
  };
};

const post = async (params) => {
  const { name, email, cpf, shirt_size, shoe_size } = params;

  return await Employee.create({
    name,
    email,
    cpf: cpf.replace(/\D/g, ''),
    shirt_size,
    shoe_size,
  });
};

const destroy = async (params) => {
  const { id } = params;
  return await Employee.destroy({ where: { id } });
};

const put = async (params) => {
  const { id, name, email, cpf, shirt_size, shoe_size } = params;
  await Employee.update(
    {
      name,
      email,
      cpf: cpf.replace(/\D/g, ''),
      shirt_size,
      shoe_size,
    },
    { where: { id } }
  );

  return await Employee.findByPk(id);
};

const patch = async (params) => {
  const { id, ...updateFields } = params;
  updatedFields?.cpf && (updateFields.cpf = updateFields.cpf.replace(/\D/g, ''));
  
  await Employee.update(updateFields, { where: { id } });
  return await Employee.findByPk(id);
};

const getById = async (id) => {
  const employee = await Employee.findByPk(id);
  if (!employee) {
    throw new Error("Funcionário não encontrado");
  }

  return employee;
}

/* @TO-DO: Implementar filtros (por e-mail, cpf, nome, etc) */
const getFiltros = async (filters) => {
  return null;
};

module.exports = { getAll, post, destroy, put, patch, getById };
