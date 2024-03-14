import express from "express";

const router = express.Router();
router.get("/api/users/signout", (req,res)=>{
    res.send("signout page");
});

export { router as signoutRouter } 