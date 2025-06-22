require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { syncDatabase } = require('./entity');
const Http = require('./utils/Http');

const PORT = process.env.PORT;
const APPLICATION_DOMAIN = process.env.APPLICATION_DOMAIN || 'http://localhost:8080';

const errorHandler = require('./middlewares/errorHandler');
const app = express();
const corsOptions = {
    origin: APPLICATION_DOMAIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
require('./services/swagger');
require('./routes')(app);
app.get('/', (_req, res) => res.status(Http.OK).send('Hello World!'));

app.use(errorHandler);
app.use('/v1/docs', express.static('src/views'));
app.use('/docs/swagger.yaml', express.static('src/docs/swagger.yaml'));

const startServer = async () => {
    await syncDatabase();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    });
};

startServer();