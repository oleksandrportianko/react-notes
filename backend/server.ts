import express from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose';

import UserRouter from './routes/user.route'
import ExplorerRouter from './routes/explorer.route'

const app = express();
dotenv.config()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(express.json());

app.use('/', UserRouter)
app.use('/', ExplorerRouter)

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_CONNECTION

if (CONNECTION_URL) {
    mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
    } as ConnectOptions)
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => console.log(error.message));
} else {
    console.log(`Connection uri not found`)
}
