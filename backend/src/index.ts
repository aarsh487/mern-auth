import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDb } from './db/database';
import { PORT } from './utils/config';
import authRoute from './routes/auth.route';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/', authRoute)


app.listen(PORT, () => {
    console.log("Server is started in PORT:", + PORT);
    connectDb();
});