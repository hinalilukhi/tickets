import express from "express";
import { json } from "body-parser";
import 'express-async-errors';

import { currentUserRouter } from "../routes/current-user";
import { signupRouter } from "../routes/signup";
import { signoutRouter } from "../routes/signout";
import { signinRouter } from "../routes/signin";
import { errorHandler } from "../middleware/error-handler";
import { NotFoundError } from "../errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signoutRouter)
app.use(signinRouter);

app.all("*", async (req, res) =>{
    throw new NotFoundError();
})

app.use(errorHandler);

app.listen(3000, ()=>{
    console.log("listening on port 3000 !!")
})