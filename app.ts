import express, { Express } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(express.json());


app.listen(parseInt(process.env.PORT || '3000'), () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome To Server 2"});
});

mongoose.connect(process.env.MONGO_URI as string, {useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions).then(() => {
    console.log("Connected to database");
}
).catch((err) => {
    console.log("Not Connected to database", err);
});

const port = process.env.PORT || '3000'; // default port is 3000 if PORT is not defined

// BEGIN: ed8c6549bwf9
app.listen(parseInt(port), () => {
    console.log(`Server running on port ${port}`);
});
// END: ed8c6549bwf9

