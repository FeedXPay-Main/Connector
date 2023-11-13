import express, { Express } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import * as dotenv from 'dotenv';
import config from './Config/config';
dotenv.config();

const app: Express = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome To Server 2"});
});

mongoose.connect(config.db.mongodb.expand as string, {useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions).then(() => {
    console.log("Connected to database");
}
).catch((err) => {
    console.log("Not Connected to database", err);
});

const port = config.app.port


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


