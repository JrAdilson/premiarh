const participantsController = require('../controllers/participants');

module.exports = (app) => {
    app.get('/participants', participantsController.getAll);
    app.post('/participants', participantsController.post);
    app.delete('/participants/:id', participantsController.destroy);
    app.put('/participants/:id', participantsController.put);
    app.patch('/participants/:id', participantsController.patch);
}