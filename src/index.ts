import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';

import { dater } from './middlewares/example'
import AuthController from './controllers/auth';

const app = express();

// load .env api_port
dotenv.config();
const API_PORT = process.env.API_PORT;

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
app.listen(API_PORT, () => {
    console.log(`Server started on port ${API_PORT}`);
});