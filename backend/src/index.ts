import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import DBConnection from './configs/db';
import { jwtCheck } from './middlewares/auth';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/', async (req, res) => {
    res.status(200).json({ message: "Server is Up" });
})

// Protected
app.use('/api/profile', jwtCheck, require('./routes/profile'));

app.listen(PORT, async () => {
    try {
        await DBConnection;
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Not Connected");
    }
    console.log(`Server is running at ${PORT}`);
})