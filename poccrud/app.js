require("dotenv").config();
const express = require ("express");
const app = express();
const getUserByIdSp = require('./api/users/user.router');

const userRouter = require('./api/users/user.router');


app.use(express.json());

app.use('/api/users', userRouter);

app.use('/api/usersbysp', getUserByIdSp);

app.listen(process.env.app_port,() =>{
    console.log("Server up and running :", process.env.app_port);
});

