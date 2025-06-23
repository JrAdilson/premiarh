const employeesController = require('../controllers/employees');

module.exports = (app) => {
    app.get('/employees', employeesController.getAll);
    app.post('/employees', employeesController.post);
    app.delete('/employees/:id', employeesController.destroy);
    app.put('/employees/:id', employeesController.put);
    app.patch('/employees/:id', employeesController.patch);
    app.get('/employees/:id', employeesController.getById);
}