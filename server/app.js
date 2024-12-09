import dotenv from 'dotenv';
import CaptainRouter from './routes/captain.routes.js';

import UseRouter from './routes/user.routes.js';


dotenv.config(); 

import express from 'express';
import cors from 'cors';
import connectToDb from './db/db.js';

const app = express();


connectToDb();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use('/v1/user',UseRouter)
app.use('/v1/captain',CaptainRouter)

export default app;
