import express from "express"

export const testSocketRouter = express.Router()

testSocketRouter.get("/", (req,res)=>{
    return res.status(200).render("test-socket", {})
})