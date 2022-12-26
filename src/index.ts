import express from 'express';
import cors from 'cors';
import { config } from './config';

const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    return res.send("Hello, world!");
});

app.listen(config.API_PORT, () => {
    console.log(`Server started on port ${config.API_PORT}`);
});