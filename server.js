import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import issueRouter from './routers/issue.router';
import userRouter from './routers/user.router';

const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established succesfully!");
});



app.use('/issues', issueRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => res.send("Hello World"));
app.listen(4000, () => console.log("Express server running on port 4000"));