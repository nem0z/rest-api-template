import express from 'express';
import cors from 'cors';

import { config } from './config';

import { dater } from './middlewares/example'
import AuthController from './controllers/auth';

const app = express();

// must have middlewares
app.use(cors());
app.use(express.json())

// custom middlewares
app.use(dater);

// default root route
app.get('/', (req, res) => {
    return res.send("Hello, world!");
});

// link controllers
app.use('/auth', AuthController);

// start server
app.listen(config.API_PORT, () => {
    console.log(`Server started on port ${config.API_PORT}`);
});