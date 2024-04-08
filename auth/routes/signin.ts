import express, {Request, Response} from "express";
import { body } from "express-validator";
import { validationRequest, BadRequestError } from "@hgtick/common";
import { Password } from "../services/password";
import { User } from "../models/user";
import jwt from "jsonwebtoken"

const router = express.Router();
router.post("/api/users/signin",[
    body('email')
    .isEmail()
    .withMessage("Email Must be valid"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("You must add a password")
    ], 
    validationRequest, 
    async (req : Request,res: Response )=> {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if(!existingUser){
            throw new BadRequestError("Invalid Credentials");
        }
        
        const passwordsMatch = await Password.compare(existingUser.password, password);

        if(!passwordsMatch) {
            throw new BadRequestError("Bad Request");
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        },
        process.env.JWT_KEY!
        )
        req.session = {
            jwt: userJwt
        };
        
    res.status(200).send(existingUser);
});

export { router as signinRouter } 