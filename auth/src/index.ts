import express from "express";
import { json } from "body-parser";
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUserRouter } from "../routes/current-user";
import { signupRouter } from "../routes/signup";
import { signoutRouter } from "../routes/signout";
import { signinRouter } from "../routes/signin";
import { errorHandler, NotFoundError } from "@hgtick/common";
import  mongoose from 'mongoose';

const app = express();
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signoutRouter)
app.use(signinRouter);

app.all("*", async (req, res) =>{
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async() => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO URL must be defined..');
    }
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected");
    }catch(err){
        console.log(err);
    }
}
app.listen(3000, ()=>{
    console.log("listening on port 3000 !!")
})
start();