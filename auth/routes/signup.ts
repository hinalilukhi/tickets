import express, { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validator-errros";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { validationRequest } from "../middleware/validate-request";

const router = express.Router();
router.post("/api/users/signup",
    [   body('email').isEmail().withMessage("email must be valid"),
        body('password').trim().isLength({ min: 4, max: 20 }).withMessage("Password must be valid")
    ],
    validationRequest,
  async (req: Request,res: Response)=>{
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY! );

    req.session = {
      jwt : userJwt
    }

    res.status(201).send(user);

});

export { router as signupRouter } 