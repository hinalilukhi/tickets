import express, { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validator-errros";

const router = express.Router();
router.post("/api/users/signup",
    [   body('email').isEmail().withMessage("email must be valid"),
        body('password').trim().isLength({ min: 4, max: 20 }).withMessage("Password must be valid")
    ],
  async (req: Request,res: Response)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        //throw error
        throw new RequestValidationError(error.array());
    }

    throw new DatabaseConnectionError();
    res.send({});

});

export { router as signupRouter } 