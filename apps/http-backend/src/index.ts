import express from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { CreateUserSchema , SigninSchema , CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();


app.post("/signup", async (req, res) => {

    const parseData = CreateUserSchema.parse(req.body);
    if(!parseData.success){
        return res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    // db call
    try {
        await prismaClient.user.create({
            data: {
                email: parseData.data?.email,
                password: parseData.data.password,
                name: parseData.data.name,
                
            }
        })
        res.json({
            userId: "123"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }

})




    


app.post("/signup", async (req, res) => {
    const data = SigninSchema.parse(req.body);
    if(!data.success){
        return res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    const userId = 1;
    const token =jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({ token });

    // Handle signup logic
})

app.post("/room" , middleware, async(req, res) => {
    const data = CreateRoomSchema.parse(req.body);
    if(!data.success){
        return res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    

    res.json({
        userId: "123"
    })
    // Handle room creation logic
})

app.listen(3001, () =>{
    console.log("Server is running on port 3001");
})