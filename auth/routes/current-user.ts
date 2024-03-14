import express from "express";

const router = express.Router();
router.get("/api/users/currentuser", (req,res)=>{
    res.send("hii");
});

export {router as currentUserRouter} //named export // exact name is required while importing named export